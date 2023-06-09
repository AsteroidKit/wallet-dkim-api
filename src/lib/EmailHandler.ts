import Signature from "dkim-signature";
import crypto from "crypto";
import NodeRsa from "node-rsa";
import dkimKey from "dkim-key";
import { Resolver } from "dns/promises";
const resolver = new Resolver();

const parse = (_eml) => {
  var obj = {} as any;
  obj.eml = _eml;
  splitMessage(obj);
  splitHeaderLines(obj);

  obj.signature = Signature.parse(obj.json["dkim-signature"][1]);
  obj.signature.headers.push("dkim-signature");

  obj.bodyCanonicalAlgo = obj.signature.canonical.split("/").pop();
  obj.headerCanonicalAlgo = obj.signature.canonical.split("/").shift();

  obj.signatureAlgo = obj.signature.algorithm.toUpperCase();
  obj.algo = obj.signature.algorithm.split("-").shift().toUpperCase();
  obj.hashingAlgo = obj.signature.algorithm.split("-").pop().toUpperCase();

  if (obj.algo === "RSA")
    obj.signatureHex = "0x" + obj.signature.signature.toString("hex");

  canonicalizeBody(obj);
  canonicalizeHeader(obj);

  obj.canonicalizedBodyHex =
    "0x" + Buffer.from(obj.canonicalizedBody, "utf8").toString("hex");
  obj.canonicalizedHeaderHex =
    "0x" + Buffer.from(obj.canonicalizedHeader, "utf8").toString("hex");
  obj.bhHex = "0x" + obj.signature.hash.toString("hex");

  // compute body hash to check
  obj.canonicalizedBodyHash =
    "0x" +
    crypto
      .createHash(obj.hashingAlgo)
      .update(obj.canonicalizedBody)
      .digest()
      .toString("hex");
  obj.canonicalizedHeaderHash =
    "0x" +
    crypto
      .createHash(obj.hashingAlgo)
      .update(obj.canonicalizedHeader)
      .digest()
      .toString("hex");

  delete obj.eml;
  delete obj.body;
  delete obj.headers;
  delete obj.headerLines;
  delete obj.json;

  return obj;
};

var DKIM = {
  NONE: "NONE",
  OK: "OK",
  TEMPFAIL: "TEMPFAIL",
  PERMFAIL: "PERMFAIL",
};

function splitMessage(obj: any) {
  // split email into headers and body
  // empty header section when email begins with CR?LF
  // or when email doesn't contain 2*CR?LF
  var match = obj.eml.match(/^\r?\n|((?:\r?\n)){2}/),
    headers = (match && obj.eml.substr(0, match.index)) || "",
    body = (match && obj.eml.substr(match.index + match[0].length)) || obj.eml;
  if (match && match[1]) {
    // make sure last header before body includes trailing newline
    headers = headers + match[1];
  }
  obj.headers = headers;
  obj.body = body;
}

function splitHeaderLines(obj: any) {
  var headerLines = obj.headers.split(/\r?\n|\r/),
    i;
  // join lines
  for (i = headerLines.length - 1; i >= 0; i--) {
    if (i && headerLines[i].match(/^\s/)) {
      headerLines[i - 1] += "\r\n" + headerLines.splice(i, 1);
    }
  }
  obj.headerLines = headerLines;

  var headersKeyLine = {};
  headerLines.forEach(function (line) {
    var index = line.indexOf(":");

    headersKeyLine[line.substr(0, index).toLowerCase()] = [
      line.substr(0, index),
      line.substr(index + 1),
    ];
  });

  obj.json = headersKeyLine;
}

function canonicalizeBody(obj: any) {
  if (obj.bodyCanonicalAlgo === "simple") {
    obj.canonicalizedBody = obj.body.replace(/(\r\n)+$/g, "") + "\r\n";
  } else if (obj.bodyCanonicalAlgo === "relaxed") {
    obj.canonicalizedBody =
      obj.body
        // Ignore all whitespace at the end of lines.
        .replace(/[\x20\x09]+(?=\r\n)/gm, "")
        // Reduce all sequences of WSP within a line to a single SP
        .replace(/[\x20\x09]+/gm, " ")
        // Ignore all empty lines at the end of the message body.
        .replace(/(\r\n)+$/g, "") + "\r\n";
  } else {
    throw Error("Body canonicalization algorithm not recognized");
  }
}

function canonicalizeHeader(obj: any) {
  obj.canonicalizedHeader = [];
  if (obj.headerCanonicalAlgo === "relaxed") {
    var headers_json = JSON.parse(JSON.stringify(obj.json));
    for (var i = 0; i < obj.signature.headers.length; i++) {
      if (obj.signature.headers[i].toLowerCase().slice(0, 2) !== "x-") {
        var value = headers_json[obj.signature.headers[i].toLowerCase()];
        if (value != null) {
          // remove any sequence of WSP at line start

          value[1] = value[1]
            .replace(/^(\r|\n|\s)+/, "")
            .replace(/^([\x20\x09])+/, "")
            // Unfold all header field continuation lines
            .replace(/\r\n/g, " ") //(?=[\x20\x09])
            // Convert all sequences of one or more WSP characters to a single SP
            .replace(/[\x20\x09]+/g, " ")
            // Devare all WSP characters at the end of each unfolded header field
            .replace(/[\x20\x09]+$/g, "");

          if ("dkim-signature" === obj.signature.headers[i].toLowerCase()) {
            value[1] = value[1].replace(/b=([^;]*)/, "b=");
          }
          obj.canonicalizedHeader.push(
            obj.signature.headers[i].toLowerCase() + ":" + value[1]
          );
        }
        delete headers_json[obj.signature.headers[i].toLowerCase()];
      }
    }
    obj.canonicalizedHeader = obj.canonicalizedHeader.join(`\r\n`);
  } else if (obj.headerCanonicalAlgo === "simple") {
    var headers_json = JSON.parse(JSON.stringify(obj.json));
    for (var i = 0; i < obj.signature.headers.length; i++) {
      if (obj.signature.headers[i].toLowerCase().slice(0, 2) !== "x-") {
        var value = headers_json[obj.signature.headers[i].toLowerCase()];
        if (value != null) {
          if ("dkim-signature" === obj.signature.headers[i].toLowerCase()) {
            value[1] = value[1].replace(/b=([^;]*)/, "b=");
          }
          obj.canonicalizedHeader.push(
            headers_json[obj.signature.headers[i].toLowerCase()][0] +
              ":" +
              value[1]
          );
        }
        delete headers_json[obj.signature.headers[i].toLowerCase()];
      }
    }
    obj.canonicalizedHeader = obj.canonicalizedHeader.join(`\r\n`);
  } else {
    throw Error("Header canonicalization algorithm not recognized");
  }
}

function parseKeyRecord(records: any) {
  var error;
  var keys = records
    .map((record) => {
      try {
        return dkimKey.parse(record.join(""));
      } catch (e) {
        return null;
      }
    })
    .filter((value) => {
      return value != null;
    });

  if (!keys.length) {
    error = new Error("No key for signature");
    error.code = DKIM.PERMFAIL;
    throw error;
  }

  if (keys.length > 1) {
    error = new Error("Ambiguous key selection");
    error.code = DKIM.TEMPFAIL;
    throw error;
  }

  const key = keys.shift();

  // If the result returned from the query does not adhere to the
  // format defined in this specification, the Verifier MUST ignore
  // the key record and return PERMFAIL (key syntax error).

  if (key == null || !Buffer.isBuffer(key.key)) {
    error = new Error("No public key found");
    error.code = DKIM.PERMFAIL;
    throw error;
  }
  return key;
}

function parseKey(obj: any, key: any) {
  var error;
  var pubKey =
    "-----BEGIN PUBLIC KEY-----\n" +
    key.key.toString("base64") +
    "\n-----END PUBLIC KEY-----";

  if (key.type.toLowerCase().includes("rsa")) {
    var rsaKey = new NodeRsa();
    rsaKey.importKey(pubKey);
    var publicComponents = rsaKey.exportKey("components-public");

    var exp = publicComponents.e.toString(16 as any);
    if (exp.length % 2 == 1) exp = "0" + exp;

    var mod = publicComponents.n.toString("hex");
    if (mod.length % 2 == 1) mod = "0" + exp;
    key.rsa = {};
    key.rsa.exponent = "0x" + exp;
    key.rsa.modulus = "0x" + mod;
    key.rsa.pubKey = pubKey;
  } else {
    error = new Error("No public key found");
    error.code = DKIM.PERMFAIL;
    throw error;
  }
}

async function getKey(obj: any) {
  var domain = obj.signature.selector + "._domainkey." + obj.signature.domain;
  const resolution = await resolver.resolveTxt(domain);
  const key = parseKeyRecord(resolution);
  parseKey(obj, key);

  return key;
}

function verifySig(obj: any, key: any) {
  switch (obj.algo) {
    case "RSA":
      return crypto
        .createVerify(obj.signatureAlgo)
        .update(obj.canonicalizedHeader)
        .verify(key.rsa.pubKey, obj.signature.signature, "base64");
      break;
    default:
      const error = new Error("Undefined Signature Scheme") as any;
      error.code = DKIM.PERMFAIL;
      throw error;
  }
  return false;
}

export { parse, verifySig, getKey };
