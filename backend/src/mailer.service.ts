import { Injectable } from "@nestjs/common";
import { SentMessageInfo } from "nodemailer";
import Mail from "nodemailer/lib/mailer";

@Injectable()
export class MailerService {
  constructor(private readonly nodeMailer: Mail) {}

  public sendEmail = async (
    to: string,
    from: string,
    subject: string,
    body: string
  ) => {
    let response: SentMessageInfo;
    try {
      response = this.nodeMailer.sendMail({
        to,
        from,
        text: body,
        subject
      });
    } catch (e) {
      throw new Error(`Error sending email: ${e.message}`);
    }

    return response;
  };
}
