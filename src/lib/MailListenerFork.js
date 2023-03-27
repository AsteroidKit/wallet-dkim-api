/**@module mail-listener5
 * @author Matej Malicek <matej@malicek.co>
 * @version 2.1.2
 * @date 26 January 2023
 */

// Require statements
import Imap from "imap";
import { EventEmitter } from "events";
import { simpleParser } from "mailparser";
import async from "async";
import { inspect } from "util";

export class MailListener extends EventEmitter {
  constructor(options) {
    super();
    this.markSeen = !!options.markSeen;
    this.mailbox = options.mailbox || "INBOX";
    if ("string" === typeof options.searchFilter) {
      this.searchFilter = [options.searchFilter];
    } else {
      this.searchFilter = options.searchFilter || ["UNSEEN"];
    }
    this.fetchUnreadOnStart = !!options.fetchUnreadOnStart;
    this.mailParserOptions = options.mailParserOptions || {};
    if (
      options.attachments &&
      options.attachmentOptions &&
      options.attachmentOptions.stream
    ) {
      this.mailParserOptions.streamAttachments = true;
    }
    this.attachmentOptions = options.attachmentOptions || {};
    this.attachments = options.attachments || false;
    this.attachmentOptions.directory = this.attachmentOptions.directory
      ? this.attachmentOptions.directory
      : "";
    this.imap = new Imap({
      xoauth2: options.xoauth2,
      user: options.username,
      password: options.password,
      host: options.host,
      port: options.port,
      tls: options.tls,
      autotls: options.autotls || null,
      tlsOptions: options.tlsOptions || {},
      connTimeout: options.connTimeout || null,
      authTimeout: options.authTimeout || null,
      debug: options.debug || null,
    });
    this.imap.once("ready", this.imapReady.bind(this));
    this.imap.once("close", this.imapClose.bind(this));
    this.imap.on("error", this.imapError.bind(this));
  }

  start() {
    this.imap.connect();
  }

  stop() {
    this.imap.end();
  }

  imapReady() {
    this.imap.openBox(this.mailbox, false, (error, mailbox) => {
      if (error) {
        this.emit("error", error);
      } else {
        this.emit("server:connected");
        this.emit("mailbox", mailbox);
        if (this.fetchUnreadOnStart) {
          this.parseUnread.call(this);
        }
        let listener = this.imapMail.bind(this);
        this.imap.on("mail", listener);
        this.imap.on("update", listener);
      }
    });
  }

  imapClose() {
    this.emit("server:disconnected");
  }

  imapError(error) {
    if (error) {
      this.emit("error", error);
    }
  }

  imapMail() {
    this.parseUnread.call(this);
  }

  parseUnread() {
    let self = this;
    self.imap.search(self.searchFilter, (error, results) => {
      if (error) {
        self.emit("error", error);
      } else if (results.length > 0) {
        async.each(
          results,
          (result, callback) => {
            let f = self.imap.fetch(result, {
              bodies: "",
              markSeen: self.markSeen,
            });
            f.on("message", (msg, seqno) => {
              let attrs;
              msg.on("attributes", (a) => {
                attrs = a;
              });
              msg.on("body", async (stream, info) => {
                var buffer = "";
                stream.on("data", function (chunk) {
                  buffer += chunk.toString("utf8");
                });
                stream.once("end", async () => {
                  const parsed = await simpleParser(buffer);
                  self.emit("mail", parsed, seqno, attrs, buffer);
                });
              });
            });
            f.once("error", (error) => {
              if (error) {
                self.emit("error", error);
              }
            });
          },
          (error) => {
            if (error) {
              self.emit("error", error);
            }
          }
        );
      }
    });
  }
}
