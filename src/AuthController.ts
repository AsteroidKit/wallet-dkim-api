import { randomString } from "./lib/RandomStrings";
import { ethers } from "ethers";
import { sendEmail, setDkimKeyAndVerifyEmail } from "./EmailController";
import { scwDeployerInstance } from "./ContractController";

export const startAuth = async (req, res) => {
  console.log("startAuth called");
  const nonce = randomString(10);
  const email = req.body.email;

  if (!email) {
    res.status(400).send("Missing email");
    throw new Error("Missing email");
  }

  await scwDeployerInstance.startAuth(email, nonce);
  await sendEmail(email, nonce);

  res.json({
    nonce: nonce,
    email,
    message: "Auth proccess started. Email sent to " + email,
  });
};

export const verifyEmail = async (req, res) => {
  console.log("VerifyEmail called");
  const emailFile = req.file;

  if (!emailFile) {
    res.status(400).send();
    throw new Error("Missing emailFile field");
  }

  await setDkimKeyAndVerifyEmail(emailFile.buffer.toString());

  res.json({ success: true, message: "Email successfully verified" });
};

export const completeAuth = async (req, res) => {
  console.log("CompleteAuth called");
  const email = req.body.email;
  const ownerPublicKey = req.body.ownerPublicKey;

  if (!email) {
    res.status(400).json({ success: false, message: "Missing email" });
    throw new Error("Missing email");
  }

  if (!ownerPublicKey) {
    res
      .status(400)
      .json({ success: false, message: "Missing owner public key" });
    throw new Error("Missing owner public key");
  }

  const tx = await scwDeployerInstance.completeAuth(email, ownerPublicKey);
  await tx.wait();

  const scwAddress = await waitForSCWAddress(email);

  res.json({
    success: true,
    message: "authenticated",
    data: { ownerKey: ownerPublicKey, scwAddress },
  });
};

export const getSCWAddressByEmail = async (req, res) => {
  console.log("getSCWAddressByEmail called");
  const userEmail = req.params.email;

  if (!userEmail) {
    res.status(400).json({ success: false, message: "Missing email" });
    throw new Error("Missing email");
  }

  const scwAddress = await scwDeployerInstance.getSCWAddressByEmail(userEmail);

  res.json({
    success: true,
    address: scwAddress !== ethers.constants.AddressZero ? scwAddress : null,
  });
};

export const isEmailVerified = async (req, res) => {
  console.log("isEmailVerified called");
  const userEmail = req.params.email;

  if (!userEmail) {
    res.status(400).json({ success: false, message: "Missing email" });
    throw new Error("Missing email");
  }

  const isEmailVerified = await scwDeployerInstance.isEmailVerified(userEmail);

  res.json({
    success: true,
    data: {
      isEmailVerified,
    },
  });
};

const waitForSCWAddress = async (email: string): Promise<string> => {
  let count = 0;

  const doLoop = async () => {
    const scwAddress = await scwDeployerInstance.getSCWAddressByEmail(email);
    count++;

    if (!scwAddress) {
      doLoop();
    } else if (count > 20) {
      throw new Error("Timeout on waitForSCWAddress");
    } else {
      return scwAddress;
    }
  };

  return doLoop();
};
