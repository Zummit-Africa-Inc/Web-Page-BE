import { Module } from '@nestjs/common';
import { WaitlistsService } from './waitlist.service';
import { Waitlist } from '../entities/waitlist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WaitlistController } from './waitlist.controllers';

@Module({
  imports: [TypeOrmModule.forFeature([Waitlist])],
  providers: [WaitlistsService],
  exports: [WaitlistsService],
  controllers: [WaitlistController],
})
export class WaitlistModule {}
