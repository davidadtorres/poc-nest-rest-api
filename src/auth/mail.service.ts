import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public send(subject: string, to: string, action: string, code: string): any {
    return this.mailerService
      .sendMail({
        to: to,
        from: process.env.MAIL_FROM,
        subject: subject,
        text: `Insert this code to complete the action of "${action.toUpperCase()}" in ${
          process.env.PROJECT_NAME
        }:\n${code}`,
        html: `<p>Insert this code to complete the action of "${action.toUpperCase()}" in <b>${
          process.env.PROJECT_NAME
        }</b>:</br><b>${code}</b></p>`,
      })
      .then(() => {
        return { status: 'ok', msg: `Mail sent to ${to}!` };
      })
      .catch(() => {
        return {
          status: 'failed',
          msg: `ERROR: mail couldn't be sent to ${to}!`,
        };
      });
  }
}
