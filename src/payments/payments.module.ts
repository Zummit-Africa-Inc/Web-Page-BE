import { Module } from '@nestjs/common';
import { PaymentService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { HttpModule } from '@nestjs/axios';
import { CoursesRepository } from '../database/repository/courses.repository';

@Module({
  imports: [HttpModule],
  controllers: [PaymentsController],
  providers: [PaymentService, CoursesRepository],
})
export class PaymentsModule {}
