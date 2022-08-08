import { BadRequestException, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ZuAppResponse } from 'src/common/helpers/response';
import { Verification } from 'src/common/Interfaces/payment.interface';
import { CoursesRepository } from 'src/database/repository/courses.repository';
import { Connection } from 'typeorm';
import { MailService } from 'src/mail/mail.service';
import { PaymentDetailsRepository } from 'src/database/repository/payments.repository';
import { createHmac } from 'crypto';
import { Request } from 'express';

@Injectable()
export class PaymentService {
  coursesRepository: CoursesRepository;
  paymentRepo: PaymentDetailsRepository;
  constructor(
    private readonly connection: Connection,
    private readonly httpService: HttpService,
    private readonly mailService: MailService,
  ) {
    this.coursesRepository =
      this.connection.getCustomRepository(CoursesRepository);
    this.paymentRepo = this.connection.getCustomRepository(
      PaymentDetailsRepository,
    );
  }

  /**
   * It receives a request from paystack, verifies the request, saves the payment, sends a mail and
   * returns a status code
   * @param {Request} req - Request - This is the request object that contains the body of the request
   * and the headers.
   * @returns The return value is the status code of the response.
   */
  async webHook(req: Request): Promise<number> {
    try {
      const hash = createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
        .update(JSON.stringify(req.body))
        .digest('hex');
      if (hash === req.headers['x-paystack-signature']) {
        const event = req.body;
        console.log(event.event);

        if (event.event === 'charge.success') {
          const { first_name, last_name, courseId } = event.data.metadata;
          const {
            amount,
            customer: { email },
          } = event.data;

          const courseDetails = await this.getDetails(courseId, true);
          this.savePayment(req.body);
          this.mailService.sendPaymentConfirmation({
            email,
            first_name,
            last_name,
            amount: amount / 100,
            ...courseDetails,
          });
          return 200;
        }
      }
    } catch (error) {
      throw new BadRequestException(
        ZuAppResponse.BadRequest('Internal Server error', error.message, '500'),
      );
    }
  }

  /**
   * It verifies a payment reference and returns the response
   * @param {string} ref - This is the reference code returned by the payment gateway.
   * @returns The response from the paystack api.
   */
  async verify(ref: string): Promise<Verification> {
    try {
      let result: any;
      await firstValueFrom(
        this.httpService.get(`${process.env.PAYSTACK_VERIFICATION_URL + ref}`, {
          headers: {
            authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            'content-type': 'application/json',
            'cache-control': 'no-cache',
          },
        }),
      )
        .then((success) => {
          result = success;
        })
        .catch((error) => {
          result = error;
        });

      /* This is a check for internet connectivity issues. */
      if (!result) {
        throw new BadRequestException(
          ZuAppResponse.OkFailure('Failed', 'Bad Internet Connection'),
        );
      }

      /* This is a check for verification errors. */
      if (result && result.status !== 200) {
        throw new BadRequestException(
          ZuAppResponse.OkFailure(
            'Failed',
            'Error verifying payment , Unknown Transaction Status',
          ),
        );
      }

      const { data, ...response } = result.data;
      return { response };
    } catch (error) {
      throw new BadRequestException(
        ZuAppResponse.BadRequest('Internal Server error', error.message, '500'),
      );
    }
  }

  /**
   * It gets the price of a course by its id
   * @param {string} id - string - The id of the course
   * @returns The price of the course
   */

  async getDetails(id: string, details?: boolean): Promise<any> {
    try {
      const course = await this.coursesRepository.findOne(id);
      if (!course) {
        throw new BadRequestException(
          ZuAppResponse.NotFoundRequest('Not Found', 'Course does not exist'),
        );
      }
      if (details) {
        return {
          title: course.title,
          description: course.description,
          tutor: course.tutor,
        };
      }
      return course.price;
    } catch (error) {
      throw new BadRequestException(
        ZuAppResponse.BadRequest('Internal Server error', error.message, '500'),
      );
    }
  }

  /**
   * It saves the payment details to the database
   * @param {any} event - any
   */
  async savePayment(event: any): Promise<void> {
    const info = {
      paystackId: event.data.id,
      status: event.data.status,
      reference: event.data.reference,
      amount: event.data.amount / 100,
      gateway_response: event.data.gateway_response,
      channel: event.data.channel,
      currency: event.data.currency,
      ip_address: event.data.ip_address,
      fees: event.data.fees,
      paidAt: event.data.paidAt,
      metadata: event.data.metadata.referrer,
    };

    const customer = {
      id: event.data.customer.id,
      first_name: event.data.customer.first_name,
      last_name: event.data.customer.last_name,
      email: event.data.customer.email,
      customer_code: event.data.customer.customer_code,
      phone: event.data.customer.phone,
    };

    const paymentDetails = this.paymentRepo.create({ ...info, customer });
    await this.paymentRepo.save(paymentDetails);
  }
}
