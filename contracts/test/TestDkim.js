var path = require("path");
var fs = require("fs");
var dkim = require("../src/dkim-lib");
const Web3 = require("web3");
const truffleAssert = require("truffle-assertions");

const dkimchecker = artifacts.require("DkimChecker.sol");
const SCWDeployer = artifacts.require("SCWDeployer");
const SCW = artifacts.require("SCW");

var files = fs.readdirSync("./borba-eml/");
files = files.filter((str) => {
  return /\.eml$/.test(str);
});

// SUBJECT IS ALSO THE NONSE
const emailAndFrom = [
  {
    from: "rodrigoj.borba@gmail.com",
    nonceSubject: "SomeTestNonce",
    eml: fs.readFileSync("./borba-eml/rodrigoj.borba@gmail.com.eml", "utf-8"),
  },
  // {
  //   from: "rodrigo@chainengine.xyz",
  //   nonceSubject: "R: nonce::DKIM test",
  //   eml: fs.readFileSync("./borba-eml/rodrigo@chainengine.xyz.eml", "utf-8"),
  // },
];

emailAndFrom.forEach((mail) => {
  try {
    var obj = dkim.parse(mail.eml);
    // getkey syncronous mether Async method failed to work when used with truffle
    var key = dkim.getKeySync(obj);

    // console.log(obj.canonicalizedHeader);
    // off chain signature verification
    // var result = dkim.verifySig(obj, key);
    contract(
      "DkimChecker " + mail.from + ": " + obj.signature.algorithm,
      function (accounts) {
        let dkimCheckerInstance;
        let scwDeployerInstance;

        it("Oracle key Writting Simulation", async function () {
          // console.log("obj.algo: " + obj.algo);
          // console.log("obj.hashingAlgo: " + obj.hashingAlgo);
          dkimCheckerInstance = await dkimchecker.deployed();
          scwDeployerInstance = await SCWDeployer.deployed();
          let val, bl;
          switch (obj.algo) {
            case "RSA":
              await dkimCheckerInstance.setDkimKeyRsa(
                obj.signature.selector,
                obj.signature.domain,
                key.rsa.exponent,
                key.rsa.modulus
              );

              val = await dkimCheckerInstance.getDkimKeyRsa(
                obj.signature.selector,
                obj.signature.domain
              );

              bl = key.rsa.exponent === val[0] && val[1] === key.rsa.modulus;
              break;
            case "ED25519":
              await dkimCheckerInstance.setDkimKeyEd(
                obj.signature.selector,
                obj.signature.domain,
                key.ed.pxh,
                key.ed.pyh,
                key.ed.point
              );

              val = await dkimCheckerInstance.getDkimKeyEd(
                obj.signature.selector,
                obj.signature.domain
              );
              bl =
                key.ed.px.toString() === val[0].toString() &&
                val[1].toString() === key.ed.py.toString();
              break;
            default:
          }

          assert.equal(bl, true);
        });

        it("Extract FROM term from header", async function () {
          const fromField = await scwDeployerInstance.getHeaderFromField(
            obj.canonicalizedHeader
          );

          expect(fromField).to.equal(mail.from);
        });

        it("Extract NONCE term from header", async function () {
          const subjectField = await scwDeployerInstance.getHeaderNonce(
            obj.canonicalizedHeader
          );

          expect(subjectField).to.equal(mail.nonceSubject);
        });

        it("Auth proccess New Wallet", async function () {
          let address = await scwDeployerInstance.getSCWAddressByEmail(
            mail.from
          );

          assert.equal(address, "0x0000000000000000000000000000000000000000");

          await debug(
            scwDeployerInstance.startAuth(mail.from, mail.nonceSubject)
          );

          await scwDeployerInstance.verifyEmail(
            obj.signature.selector,
            obj.signature.domain,
            obj.signatureHex,
            obj.canonicalizedHeader
          );

          // await scwDeployerInstance.verifyEmail(
          //   obj.signature.selector,
          //   obj.signature.domain,
          //   obj.signatureHex,
          //   obj.canonicalizedHeader
          // );

          await scwDeployerInstance.completeAuth(mail.from, accounts[0]);

          address = await scwDeployerInstance.getSCWAddressByEmail(mail.from);
          expect(address).not.to.equal(
            "0x0000000000000000000000000000000000000000"
          );
        });

        it("Auth proccess Existing Wallet", async function () {
          let scwAddress = await scwDeployerInstance.getSCWAddressByEmail(
            mail.from
          );

          // Assures that account exisits
          expect(scwAddress).not.to.equal(
            "0x0000000000000000000000000000000000000000"
          );

          const scwInstance = await SCW.at(scwAddress);

          await scwDeployerInstance.startAuth(mail.from, mail.nonceSubject);
          await scwDeployerInstance.verifyEmail(
            obj.signature.selector,
            obj.signature.domain,
            obj.signatureHex,
            obj.canonicalizedHeader
          );

          await scwDeployerInstance.completeAuth(mail.from, accounts[1]);

          const newOwner = await scwInstance.ownerAddress();

          expect(newOwner).to.equal(accounts[1]);
        });

        it("Send ethers to SCW", async function () {
          let scwAddress = await scwDeployerInstance.getSCWAddressByEmail(
            mail.from
          );

          // Assures that account exisits
          expect(scwAddress).not.to.equal(
            "0x0000000000000000000000000000000000000000"
          );

          const scwInstance = await SCW.at(scwAddress);

          await scwInstance.send(1, { from: accounts[0] });

          const balance = await scwInstance.getBalance();
          expect(balance.toNumber()).to.equal(1);
        });

        it("Send ethers from SCW", async function () {
          let scwAddress = await scwDeployerInstance.getSCWAddressByEmail(
            mail.from
          );

          // Assures that account exisits
          expect(scwAddress).not.to.equal(
            "0x0000000000000000000000000000000000000000"
          );

          const scwInstance = await SCW.at(scwAddress);

          await scwInstance.transferNative(1, accounts[0]);

          const balance = await scwInstance.getBalance();

          expect(balance.toNumber()).to.equal(0);
        });
      }
    );
  } catch (error) {
    console.log(error);
    console.log(error.code);
  }
});
