"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@nomicfoundation/hardhat-toolbox");
const config = {
    solidity: "0.8.0",
    defaultNetwork: "ganache",
    networks: {
        ganache: {
            url: "http://127.0.0.1:7545",
            accounts: [
                `0x69eca99378cf961f8371958203bd4ed1166d63d74621f968feeb1380a6dc57c3`,
                `0xceb46bf6643d9088be6b114c1b921c94328ecb501d7982cfb19b10f999223375`,
            ],
        },
    },
};
exports.default = config;
