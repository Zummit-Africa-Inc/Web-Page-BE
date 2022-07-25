import { BadRequestException, Injectable } from '@nestjs/common';
import { ZuAppResponse } from 'src/common/helpers/response';
import { CoursesRepository } from 'src/database/repository/courses.repository';
import { Course } from 'src/entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import {
  FilterOperator,
  PaginateQuery,
  paginate,
  Paginated,
} from 'nestjs-paginate';

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

  /**
   * It finds a course by its id and returns it
   * @param {string} id - The id of the course you want to find.
   * @returns The course that was found.
   */
  async findOne(id: string): Promise<Course> {
    try {
      const course = await this.coursesRepository.findOne(id);
      /* Checking if the course already exists. If it doesn't, it throws an error. */
      if (!course) {
        throw new BadRequestException(
          ZuAppResponse.NotFoundRequest(
            'Not Found',
            'This course does not exist',
          ),
        );
      } else {
        return course;
      }
    } catch (error) {
      throw new BadRequestException(
        ZuAppResponse.BadRequest('Internal Server error', error.message, '500'),
      );
    }
  }

  /**
   * It returns a list of all courses in the database
   * @returns An array of courses
   */
  async findAll(): Promise<Course[]> {
    try {
      return await this.coursesRepository.find();
    } catch (error) {
      throw new BadRequestException(
        ZuAppResponse.BadRequest('Internal Server error', error.message, '500'),
      );
    }
  }

  /**
   * It updates a course with the given id and body
   * @param {string} id - string - the id of the course to be updated
   * @param {UpdateCourseDto} body - UpdateCourseDto
   * @returns The updated course
   */
  async update(id: string, body: UpdateCourseDto): Promise<Course> {
    try {
      const course = await this.coursesRepository.findOne(id);
      if (!course) {
        throw new BadRequestException(
          ZuAppResponse.NotFoundRequest(
            'Not Found',
            'This course does not exist',
          ),
        );
      }
      if (body.rating) body.rating = parseFloat(body.rating.toFixed(1));
      /* Updating the course with the given id and body. */
      const updatedCourse = await this.coursesRepository
        .createQueryBuilder()
        .update(Course)
        .set({ ...body })
        .where('id = :id', {
          id,
        })
        .returning('*')
        .execute();

      return updatedCourse.raw[0];
    } catch (error) {
      throw new BadRequestException(
        ZuAppResponse.BadRequest('Internal Server error', error.message, '500'),
      );
    }
  }

  /**
   * It returns a paginated list of courses.
   * @param {PaginateQuery} query - PaginateQuery - This is the query object that is passed in from the
   * client.
   * @returns A paginated object with the following properties:
   */
  search(query: PaginateQuery): Promise<Paginated<Course>> {
    return paginate(query, this.coursesRepository, {
      sortableColumns: ['title', 'tutor', 'description', 'rating'],
      searchableColumns: ['title', 'tutor', 'description'],
      filterableColumns: {
        title: [FilterOperator.IN],
        tutor: [FilterOperator.IN],
        description: [FilterOperator.IN],
        rating: [FilterOperator.GTE],
      },
    });
  }
}
