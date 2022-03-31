import { Module } from '@nestjs/common';
import { DemoSectionService } from './demo-section.service';
import { DemoSectionController } from './demo-section.controller';
import { DemoSection } from './demo-section.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [DemoSectionController],
  imports: [TypeOrmModule.forFeature([DemoSection])],
  providers: [DemoSectionService],
  exports: [DemoSectionService],
})
export class DemoSectionModule {}
