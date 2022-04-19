import { Module } from '@nestjs/common';
import { WaitlistsService } from './waitlist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WaitlistController } from './waitlist.controllers';
import { WaitlistRepository } from '../database/repository/waitlist.repository';
import { InternshipCategoryRepository } from '../database/repository/internship-category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([WaitlistRepository, InternshipCategoryRepository])],
  providers: [WaitlistsService],
  exports: [WaitlistsService],
  controllers: [WaitlistController],
})
export class WaitlistModule {}
