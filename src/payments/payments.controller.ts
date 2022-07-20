import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PaymentService } from './payments.service';
import { ZuAppResponse } from 'src/common/helpers/response';
import { Ok } from 'src/common/helpers/response/ResponseType';
import { Verification } from '../common/Interfaces/payment.interface';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiOperation({ summary: 'verify payment status' })
  @Post('verification')
  async verify(@Query() ref: any): Promise<Ok<Verification>> {
    const status = await this.paymentService.verify(ref.ref);
    return ZuAppResponse.Ok(status, 'Success', '200');
  }

  @ApiOperation({ summary: 'get item price' })
  @Get('get-price/:id')
  async getPrice(@Param('id') id: string): Promise<Ok<number>> {
    const price = await this.paymentService.getPrice(id);
    return ZuAppResponse.Ok(price, 'Success', '200');
  }
}
