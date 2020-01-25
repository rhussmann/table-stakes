import Mail from "nodemailer/lib/mailer";

import * as TypeMoq from "typemoq";

import { MailerService } from "../src/mailer.service";

describe("Mailer service", () => {
  const me = "ricky.hussmann@gmail.com";
  const subject = "Hello, World";
  const body = "This is the email body";

  let transport: TypeMoq.IMock<Mail> = undefined;
  let mailer: MailerService;

  beforeEach(() => {
    transport = TypeMoq.Mock.ofType<Mail>(Mail);
    mailer = new MailerService(transport.object);
  });

  it("invokes transport's `sendMail`", async () => {
    await mailer.sendEmail(me, me, subject, body);
    transport.verify(
      t => t.sendMail({ from: me, to: me, text: body, subject }),
      TypeMoq.Times.atLeastOnce()
    );
  });

  it("throws an error when `sendMail` fails", async () => {
    transport
      .setup(t => t.sendMail(TypeMoq.It.isAny()))
      .throws(new Error("bad"));
    expect(mailer.sendEmail(me, me, body, subject)).rejects.toThrow(
      "Error sending email"
    );
  });
});
