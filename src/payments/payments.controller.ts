import { Controller, Get, Param, Post, Query, Req, Res } from '@nestjs/common';
import { PaymentService } from './payments.service';
import { ZuAppResponse } from 'src/common/helpers/response';
import { Ok } from 'src/common/helpers/response/ResponseType';
import { Verification } from '../common/Interfaces/payment.interface';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiOperation({ summary: 'verify payment status' })
  @Post('verification')
  async verify(@Query('ref') ref: string): Promise<Ok<Verification>> {
    const status = await this.paymentService.verify(ref);
    return ZuAppResponse.Ok(status, 'Success', '200');
  }

  @ApiOperation({ summary: 'get item price' })
  @Get('get-price/:id')
  async getPrice(@Param('id') id: string): Promise<Ok<any>> {
    const price = await this.paymentService.getDetails(id);
    return ZuAppResponse.Ok(price, 'Success', '200');
  }

  @ApiOperation({ summary: 'paystack webhook endpoint' })
  @Post('notification')
  async paystackWebHook(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const response = await this.paymentService.webHook(req);
    response && res.sendStatus(200);
  }
}
