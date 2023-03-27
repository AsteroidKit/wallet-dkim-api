// import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
// import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
// import { expect } from "chai";
// import { ethers } from "hardhat";
// import { parse, getKey } from "../src/handler";
// import fs from "fs";

// import { SCWDeployer__factory } from "../typechain-types";

// describe("Lock", function () {
//   // We define a fixture to reuse the same setup in every test.
//   // We use loadFixture to run this setup once, snapshot that state,
//   // and reset Hardhat Network to that snapshot in every test.
//   async function deployContractsFixture() {
//     const [deployer] = await ethers.getSigners();

//     const DkimChecker = await ethers.getContractFactory("DkimChecker");
//     const SCWDeployer = await ethers.getContractFactory("SCWDeployer");

//     const dkimChecker = await DkimChecker.deploy(deployer.address);
//     const scwDeployer = await SCWDeployer.deploy(dkimChecker.address);

//     return { dkimChecker, scwDeployer };
//   }

//   async function setDKIMKey(dkimChecker, emlPath: string) {
//     const [deployer] = await ethers.getSigners();

//     var eml = fs.readFileSync("emlPath", "utf-8");

//     const obj = parse(eml);
//     const key = getKey(obj);

//     return { obj, key };
//   }

//   describe("Deployment", async () => {
//     it("Test", async function () {
//       const { dkimChecker, scwDeployer } = await loadFixture(
//         deployContractsFixture
//       );

//       await scwDeployer.createNewAccount("rodrigo", "nonce");
//     });
//   });
// });
