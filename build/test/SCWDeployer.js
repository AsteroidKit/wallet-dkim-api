"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_network_helpers_1 = require("@nomicfoundation/hardhat-network-helpers");
const hardhat_1 = require("hardhat");
const handler_1 = require("../src/api/handler");
const fs_1 = __importDefault(require("fs"));
describe("Lock", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    function deployContractsFixture() {
        return __awaiter(this, void 0, void 0, function* () {
            const [deployer] = yield hardhat_1.ethers.getSigners();
            const DkimChecker = yield hardhat_1.ethers.getContractFactory("DkimChecker");
            const SCWDeployer = yield hardhat_1.ethers.getContractFactory("SCWDeployer");
            const dkimChecker = yield DkimChecker.deploy(deployer.address);
            const scwDeployer = yield SCWDeployer.deploy(dkimChecker.address);
            return { dkimChecker, scwDeployer };
        });
    }
    function setDKIMKey(dkimChecker, emlPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const [deployer] = yield hardhat_1.ethers.getSigners();
            var eml = fs_1.default.readFileSync("emlPath", "utf-8");
            const obj = (0, handler_1.parse)(eml);
            const key = (0, handler_1.getKey)(obj);
            return { obj, key };
        });
    }
    describe("Deployment", function () {
        it("Should set the right unlockTime", function () {
            return __awaiter(this, void 0, void 0, function* () {
                const { dkimChecker, scwDeployer } = yield (0, hardhat_network_helpers_1.loadFixture)(deployContractsFixture);
            });
        });
    });
});
