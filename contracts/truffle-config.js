require("dotenv").config();
// const HDWalletProvider = require("@truffle/hdwallet-provider");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { DEPLOYER_PRIVATE_KEY, INFURA_PROVIDER } = process.env;

module.exports = {
  networks: {
    test: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id
    },
    mumbai: {
      provider: () =>
        new HDWalletProvider(DEPLOYER_PRIVATE_KEY, INFURA_PROVIDER),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
  },

  mocha: {
    reporter: "eth-gas-reporter",
    reporterOptions: {
      currency: "USD",
      gasPrice: 1,
    },
  },

  // compilers: {
  //   solc: {
  //     version: "0.8.0",
  //   },
  // },
  solc: {
    optimizer: {
      enabled: true,
      runs: 2000,
    },
  },
};
