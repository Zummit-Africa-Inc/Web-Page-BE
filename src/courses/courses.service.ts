import { BadRequestException, Injectable } from '@nestjs/common';
import { ZuAppResponse } from 'src/common/helpers/response';
import { CoursesRepository } from 'src/database/repository/courses.repository';
import { Course } from 'src/entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CourseService {
  constructor(private readonly coursesRepository: CoursesRepository) {}

  /**
   * It creates a new course
   * @param {CreateCourseDto} createCourseDto - This is the data transfer object that contains the data
   * that will be used to create a new course.
   * @returns A promise of a course
   */
  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    try {
      const isExisting = await this.coursesRepository.findOne({
        where: { title: createCourseDto.title, tutor: createCourseDto.tutor },
      });
      /* Checking if the course already exists. If it does, it throws an error. */
      if (isExisting) {
        throw new BadRequestException(
          ZuAppResponse.BadRequest(
            'Existing Course',
            'This action might be a duplicate, Try using a different title',
          ),
        );
      } else {
        /* Creating a new course and saving it to the database. */
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
