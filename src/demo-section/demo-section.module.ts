import { Module } from '@nestjs/common';
import { DemoSectionService } from './demo-section.service';
import { DemoSectionController } from './demo-section.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DemoSectionRepository } from 'src/database/repository/demo-section.repository';

@Module({
  controllers: [DemoSectionController],
  imports: [TypeOrmModule.forFeature([DemoSectionRepository])],
  providers: [DemoSectionService],
  exports: [DemoSectionService],
})
export class DemoSectionModule {}
