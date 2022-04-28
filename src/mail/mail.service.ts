import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Demo_Requests } from 'src/entities/demo-section.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  /* Sending a mail to the user who requested for a demo. */
  async sendUserConfirmation(user: Demo_Requests) {
    await this.mailerService.sendMail({
      to: user.email,
      from: 'no_reply@zummitafrica.com',
      subject: 'Demo Request Successful',
      template: 'confirmation',
      context: {
        name: user.fullName,
        email: user.email,
      },
    });
  }
}
