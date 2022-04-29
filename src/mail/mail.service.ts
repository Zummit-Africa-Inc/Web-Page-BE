import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Demo_Requests } from 'src/entities/demo-section.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  /* Sending a mail to the user who requested for a demo. */
  async sendUserConfirmation(user: Demo_Requests) {
    await this.mailerService.sendMail({
      to: 'contact@zummitafrica.com',
      from: 'no_reply@zummitafrica.com',
      subject: 'New Demo Request',
      template: 'confirmation',
      context: {
        name: user.fullName,
        email: user.email,
        company: user.companyName,
        message: user.message,
      },
    });
  }
}
