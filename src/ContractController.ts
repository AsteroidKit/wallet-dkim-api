import { ethers } from "ethers";

import SCWDeployerJson from "../contracts/build/contracts/SCWDeployer.json";
import DKIMCheckerJson from "../contracts/build/contracts/DkimChecker.json";

const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const DKIM_CHECKER_ADDRESS = process.env.DKIM_CHECKER_ADDRESS || "";
const SCW_DEPLOYER_ADDRESS = process.env.SCW_DEPLOYER_ADDRESS || "";

const provider = new ethers.providers.JsonRpcProvider(
  process.env.RPC_PROVIDER_ADDRESS || "http://127.0.0.1:7545"
);

const signer = new ethers.Wallet(PRIVATE_KEY, provider);

export const scwDeployerInstance = new ethers.Contract(
  SCW_DEPLOYER_ADDRESS,
  SCWDeployerJson.abi,
  signer
);

export const dkimCheckerInstance = new ethers.Contract(
  DKIM_CHECKER_ADDRESS,
  DKIMCheckerJson.abi,
  signer
);
