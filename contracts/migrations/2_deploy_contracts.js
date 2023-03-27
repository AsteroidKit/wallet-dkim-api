const DkimChecker = artifacts.require("DkimChecker");
const SCWDeployer = artifacts.require("SCWDeployer");
// const USDC = artifacts.require("USDC");

module.exports = (deployer, network, accounts) => {
  deployer.then(async () => {
    await deployer.deploy(DkimChecker, accounts[0]);
    await deployer.deploy(SCWDeployer, DkimChecker.address);
    // await deployer.deploy(USDC, 1000000000000000000000);
  });
};
