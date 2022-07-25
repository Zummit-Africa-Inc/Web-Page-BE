import { Module } from '@nestjs/common';
import { PaymentService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { HttpModule } from '@nestjs/axios';
import { CoursesRepository } from '../database/repository/courses.repository';
import { MailModule } from 'src/mail/mail.module';
import { PaymentDetailsRepository } from 'src/database/repository/payments.repository';

@Module({
  imports: [HttpModule, MailModule],
  controllers: [PaymentsController],
  providers: [PaymentService, CoursesRepository, PaymentDetailsRepository],
})
export class PaymentsModule {}
