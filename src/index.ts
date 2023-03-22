import express from "express";
import { ethers } from "ethers";
import bodyParser from "body-parser";
import { parse, getKey } from "./handler";

import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

import SCWDeployerJson from "../build/contracts/SCWDeployer.json";
import DKIMCheckerJson from "../build/contracts/DkimChecker.json";

const app = express();
const port = 3000;

// var bodyParser = require("body-parser");

const privatekey =
  "69eca99378cf961f8371958203bd4ed1166d63d74621f968feeb1380a6dc57c3";
const SCWDeployerAddress = "0xc79F3430BcDfDE318b4D547d7f43c498d26356b2";
const DKIMCheckerAddress = "0xdBfA82e825D28a636D345F6117AeDbCe0F381088";

const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545");
const signer = new ethers.Wallet(privatekey, provider);

const scwDeployerInstance = new ethers.Contract(
  SCWDeployerAddress,
  SCWDeployerJson.abi,
  signer
);

const dkimCheckerInstance = new ethers.Contract(
  DKIMCheckerAddress,
  DKIMCheckerJson.abi,
  signer
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(multer().array());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.post("/auth", upload.none(), async (req, res) => {
  const nonce = randomString(10);
  const email = req.body.email;

  if (!email) {
    res.status(400).send("Missing email");
    throw new Error("Missing email");
  }

  const scwAddress = await scwDeployerInstance.getSCWAddressByEmail(email);

  let tx;
  if (scwAddress == "0x0000000000000000000000000000000000000000") {
    tx = await scwDeployerInstance.createNewAccount(email, nonce);
  } else {
    // Auth to set new owner key
  }

  res.json({ nonce: nonce, email: req.body.email });
});

app.post("/verifyEmail", upload.single("emailFile"), async (req, res) => {
  const emailFile = req.file;
  const userEmail = req.body.email;
  const nonce = req.body.nonce; // TODO: To be removed

  // if (!emailFile) {
  //   res.status(400).send();
  //   throw new Error("Missing email file");
  // }

  // if (!userEmail) {
  //   res.status(400).send();
  //   throw new Error("Missing user email");
  // }

  // if (!nonce) {
  //   res.status(400).send();
  //   throw new Error("Missing nonce");
  // }

  const obj = parse(emailFile.buffer.toString());
  const key = await getKey(obj);

  console.log(obj.canonicalizedHeader);
  return;

  // TODO: This will be done by the oracle. Here we're just mocking the behavior
  await dkimCheckerInstance.setDkimKeyRsa(
    obj.signature.selector,
    obj.signature.domain,
    key.rsa.exponent,
    key.rsa.modulus
  );

  console.log(obj.canonicalizedHeader);

  await scwDeployerInstance.confirmNewAccountEmail(
    obj.signature.selector,
    obj.signature.domain,
    obj.signatureHex,
    obj.canonicalizedHeader,
    obj.canonicalizedBody,
    userEmail,
    nonce
  );

  res.send("Email verified");
});

app.post("/deployNewSCW", upload.none(), async (req, res) => {
  const email = req.body.email;
  const ownerPublicKey = req.body.ownerPublicKey;

  console.log(req.body);

  if (!email) {
    res.status(400).send();
    throw new Error("Missing email");
  }

  if (!ownerPublicKey) {
    res.status(400).send();
    throw new Error("Missing owner public key");
  }
  await scwDeployerInstance.deployNewSWC(email, ownerPublicKey);

  res.status(201).send("New account created");
});

app.get("/scwAddress/:email", async (req, res) => {
  const userEmail = req.params.email;

  const scwAddress = await scwDeployerInstance.getSCWAddressByEmail(userEmail);

  res.json({ address: scwAddress }).send();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// https://www.thepolyglotdeveloper.com/2015/03/create-a-random-nonce-string-using-javascript/
const randomString = function (length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};
