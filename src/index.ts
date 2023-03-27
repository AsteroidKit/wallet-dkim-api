import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import {
  setDkimKeyAndVerifyEmail,
  startEmailListening,
} from "./EmailController";

import multer from "multer";

import {
  completeAuth,
  getSCWAddressByEmail,
  isEmailVerified,
  startAuth,
  verifyEmail,
} from "./AuthController";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500);
  res.json({ success: false, message: "Error", stack: err.stack });
});

startEmailListening((mail, seqno, attrs, raw) => {
  console.log("On new email callback called");
  setDkimKeyAndVerifyEmail(raw);
});

app.post("/startAuth", upload.none(), startAuth);

app.post("/verifyEmail", upload.single("emailFile"), verifyEmail);

app.post("/completeAuth", upload.none(), completeAuth);

app.get("/getSCWAddressByEmail/:email", getSCWAddressByEmail);

app.get("/isEmailVerified/:email", isEmailVerified);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
