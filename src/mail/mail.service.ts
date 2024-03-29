import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Details } from 'src/common/Interfaces/mailDetails.interface';
import { Demo_Requests } from 'src/entities/demo-section.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: Demo_Requests) {
    /**
     * It sends an email to the zummit with the details of a user.
     * @param {Demo_Requests} user - Demo_Requests
     */
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
  /**
   * It sends an email to the user with the details of the course they just purchased
   * @param {Details} details - Details
   */
  async sendPaymentConfirmation(details: Details) {
    await this.mailerService.sendMail({
      to: [details.email, 'contact@zummitafrica.com'],
      from: process.env.MAIL_FROM,
      subject: 'Welcome to Zummit Africa Academy',
      template: 'payment',
      context: {
        ...details,
      },
    });
  }
}
