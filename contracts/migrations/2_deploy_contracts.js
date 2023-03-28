const DkimChecker = artifacts.require("DkimChecker");
const SCWDeployer = artifacts.require("SCWDeployer");
// const USDC = artifacts.require("USDC");

module.exports = (deployer, network, accounts) => {
  deployer.then(async () => {
    await deployer.deploy(
      DkimChecker,
      "0x3586D187D1a65d0cbAf09f74DCC91a2c2847a833"
    );
    await deployer.deploy(SCWDeployer, DkimChecker.address);
    // await deployer.deploy(USDC, 1000000000000000000000);
  });
};
