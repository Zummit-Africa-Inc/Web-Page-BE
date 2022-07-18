import { Module } from '@nestjs/common';
import { CourseService } from './courses.service';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesRepository } from 'src/database/repository/courses.repository';

@Module({
  controllers: [CoursesController],
  imports: [TypeOrmModule.forFeature([CoursesRepository])],
  providers: [CourseService],
})
export class CoursesModule {}
