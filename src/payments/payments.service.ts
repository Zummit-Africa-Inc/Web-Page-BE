import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ZuAppResponse } from 'src/common/helpers/response';
import { Verification } from 'src/common/Interfaces/payment.interface';
import { CoursesRepository } from 'src/database/repository/courses.repository';
import { Connection } from 'typeorm';

@Injectable()
export class PaymentService {
  coursesRepository: CoursesRepository;
  constructor(
    private readonly connection: Connection,
    private readonly httpService: HttpService,
  ) {
    this.coursesRepository =
      this.connection.getCustomRepository(CoursesRepository);
  }

  /**
   * It takes a reference id as a parameter, makes a request to the paystack api to verify the
   * transaction, and returns a response to the client
   * @param {string} ref - This is the transaction reference id gotten from the paystack API.
   * @returns A response to the client.
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
      if (!result.response && result.status !== 200)
        throw new BadRequestException(
          ZuAppResponse.OkFailure('Failed', 'Bad Internet Connection'),
        );

      /* This is a check for verification errors. */
      if (result.response && !result.response.data.status)
        throw new BadRequestException(
          ZuAppResponse.OkFailure(
            'Failed',
            'Error verifying payment , Unknown Transaction Reference Id',
          ),
        );

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
  async getPrice(id: string): Promise<number> {
    try {
      const course = await this.coursesRepository.findOne(id);
      if (!course) {
        throw new BadRequestException(
          ZuAppResponse.NotFoundRequest('Not Found', 'Course does not exist'),
        );
      }
      return course.price;
    } catch (error) {
      throw new BadRequestException(
        ZuAppResponse.BadRequest('Internal Server error', error.message, '500'),
      );
    }
  }
}
