import { BadRequestException, Injectable } from '@nestjs/common';
import { ZuAppResponse } from 'src/common/helpers/response';
import { CoursesRepository } from 'src/database/repository/courses.repository';
import { Course } from 'src/entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CourseService {
  constructor(private readonly coursesRepository: CoursesRepository) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    try {
      const isExisting = await this.coursesRepository.findOne({
        where: { title: createCourseDto.title, tutor: createCourseDto.tutor },
      });
      if (isExisting) {
        throw new BadRequestException(
          ZuAppResponse.BadRequest(
            'Existing Course',
            'This action might be a duplicate, Try using a different title',
          ),
        );
      } else {
        const newCourse = this.coursesRepository.create(createCourseDto);
        return await this.coursesRepository.save(newCourse);
      }
    } catch (error) {
      throw new BadRequestException(
        ZuAppResponse.BadRequest('Internal Server error', error.message, '500'),
      );
    }
  }
}
