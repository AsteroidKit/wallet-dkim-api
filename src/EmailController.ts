import { MailListener } from "./lib/MailListenerFork";
import nodemailer from "nodemailer";
import { parse, getKey } from "./lib/EmailHandler";
import { dkimCheckerInstance, scwDeployerInstance } from "./ContractController";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const startEmailListening = (
  onNewEmailCallback: (mail, seqno, attrs, raw: string) => void
) => {
  const currentTime = new Date().getTime();
  const mailListener = new MailListener({
    username: process.env.EMAIL_USERNAME,
    password: process.env.EMAIL_PASSWORD,
    host: process.env.EMAIL_HOST,
    port: 993, // imap port
    tls: true,
    connTimeout: 10000, // Default by node-imap
    authTimeout: 5000, // Default by node-imap,
    autotls: "never", // default by node-imap
    tlsOptions: { rejectUnauthorized: false },
    mailbox: "INBOX", // mailbox to monitor
    searchFilter: ["UNSEEN", ["SINCE", currentTime + 10000]], // the search filter being used after an IDLE notification has been retrieved
    markSeen: true, // all fetched email willbe marked as seen and not fetched next time
    fetchUnreadOnStart: false, // use it only if you want to get all unread email on lib start. Default is `false`,
    attachments: false, // download attachments as they are encountered to the project directory
  });

  mailListener.start();

  mailListener.on("server:connected", function () {
    console.log("IMAP Connected");
    console.log("Email Address: " + process.env.EMAIL_USERNAME);
  });

  mailListener.on("server:disconnected", function () {
    console.log("IMAP Disconnected");
  });

  mailListener.on("error", function (err) {
    console.error(err);
  });

  mailListener.on("mail", function (mail, seqno, attrs, raw) {
    console.log("---------------");
    console.log("New email received");
    console.log("Subject: " + mail.subject);
    console.log("From: " + normalizeFrom(mail.from.text));
    console.log("---------------");

    onNewEmailCallback(mail, seqno, attrs, raw);
  });
};

export const sendEmail = async (userEmail: string, nonce: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: userEmail,
    subject: `nonce::${nonce}`,
    text: "Reply this email without changing any data in order to confirm your email on PoC Wallet",
  };

  await transporter.sendMail(mailOptions);
  console.log("Email sent to: " + userEmail);
};

export const setDkimKeyAndVerifyEmail = async (email: string) => {
  const obj = parse(email);
  const key = await getKey(obj);

  // TODO: This will be done by the oracle. Here we're just mocking the behavior
  await dkimCheckerInstance.setDkimKeyRsa(
    obj.signature.selector,
    obj.signature.domain,
    key.rsa.exponent,
    key.rsa.modulus
  );

  await scwDeployerInstance.verifyEmail(
    obj.signature.selector,
    obj.signature.domain,
    obj.signatureHex,
    obj.canonicalizedHeader
  );
};

const normalizeFrom = (from: string) => {
  if (from.lastIndexOf(">") === from.length - 1) {
    const fromParsedData = from.substring(
      from.lastIndexOf("<") + 1,
      from.length - 1
    );

    return fromParsedData;
  } else {
    return from;
  }
};
