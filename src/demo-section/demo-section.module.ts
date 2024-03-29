import { Module } from '@nestjs/common';
import { DemoSectionService } from './demo-section.service';
import { DemoSectionController } from './demo-section.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DemoSectionRepository } from 'src/database/repository/demo-section.repository';
import { MailModule } from 'src/mail/mail.module';
import { MailService } from 'src/mail/mail.service';

@Module({
  controllers: [DemoSectionController],
  imports: [TypeOrmModule.forFeature([DemoSectionRepository]), MailModule],
  providers: [DemoSectionService, MailService],
  exports: [DemoSectionService],
})
export class DemoSectionModule {}
