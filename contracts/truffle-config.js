module.exports = {
  networks: {
    test: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id
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
