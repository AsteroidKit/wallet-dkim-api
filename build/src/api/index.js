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
const express_1 = __importDefault(require("express"));
const ethers_1 = require("ethers");
const body_parser_1 = __importDefault(require("body-parser"));
const handler_1 = require("./handler");
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
const SCWDeployer_json_1 = __importDefault(require("../../build/contracts/SCWDeployer.json"));
const DkimChecker_json_1 = __importDefault(require("../../build/contracts/DkimChecker.json"));
const app = (0, express_1.default)();
const port = 3000;
// var bodyParser = require("body-parser");
const privatekey = "69eca99378cf961f8371958203bd4ed1166d63d74621f968feeb1380a6dc57c3";
const SCWDeployerAddress = "0xC70442FF97091B7b4ec34063cD2315399B5FcC59";
const DKIMCheckerAddress = "0x7D8F68Ca8CAb699747E20fCFd8f9Bb8C41d05031";
const provider = new ethers_1.ethers.providers.JsonRpcProvider("http://127.0.0.1:7545");
const signer = new ethers_1.ethers.Wallet(privatekey, provider);
const scwDeployerInstance = new ethers_1.ethers.Contract(SCWDeployerAddress, SCWDeployer_json_1.default.abi, signer);
const dkimCheckerInstance = new ethers_1.ethers.Contract(DKIMCheckerAddress, DkimChecker_json_1.default.abi, signer);
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
// app.use(multer().array());
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
app.post("/auth", upload.none(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const nonce = randomString(10);
    const nonce = "nonce";
    const email = req.body.email;
    if (!email) {
        res.status(400).send("Missing email");
        throw new Error("Missing email");
    }
    const scwAddress = yield scwDeployerInstance.getSCWAddressByEmail(email);
    let tx;
    if (scwAddress == "0x0000000000000000000000000000000000000000") {
        tx = yield scwDeployerInstance.createNewAccount(email, nonce);
    }
    else {
        // Auth to set new owner key
    }
    res.json({ nonce: nonce, email: req.body.email });
}));
app.post("/verifyEmail", upload.single("emailFile"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const emailFile = req.file;
    const userEmail = req.body.email;
    const nonce = req.body.nonce; // TODO: To be removed
    if (!emailFile) {
        res.status(400).send();
        throw new Error("Missing email file");
    }
    if (!userEmail) {
        res.status(400).send();
        throw new Error("Missing user email");
    }
    if (!nonce) {
        res.status(400).send();
        throw new Error("Missing nonce");
    }
    const obj = (0, handler_1.parse)(emailFile.buffer.toString());
    const key = yield (0, handler_1.getKey)(obj);
    // TODO: This will be done by the oracle. Here we're just mocking the behavior
    yield dkimCheckerInstance.setDkimKeyRsa(obj.signature.selector, obj.signature.domain, key.rsa.exponent, key.rsa.modulus);
    yield scwDeployerInstance.confirmNewAccountEmail(obj.signature.selector, obj.signature.domain, obj.signatureHex, obj.canonicalizedHeaderHex, userEmail, nonce);
    res.send("Email verified");
}));
app.post("/deployNewSCW", upload.none(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    yield scwDeployerInstance.deployNewSWC(email, ownerPublicKey);
    res.status(201).send("New account created");
}));
app.get("/scwAddress/:email", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userEmail = req.params.email;
    const scwAddress = yield scwDeployerInstance.getSCWAddressByEmail(userEmail);
    res.json({ address: scwAddress }).send();
}));
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
// https://www.thepolyglotdeveloper.com/2015/03/create-a-random-nonce-string-using-javascript/
const randomString = function (length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};
