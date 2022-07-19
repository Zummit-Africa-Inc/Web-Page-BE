import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Ok } from 'src/common/helpers/response/ResponseType';
import { ZuAppResponse } from 'src/common/helpers/response';
import { Course } from 'src/entities/course.entity';
import { CourseService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';

@ApiTags('Courses')
@Controller('course')
export class CoursesController {
  constructor(private readonly coursesService: CourseService) {}

  @Post()
  @ApiOperation({ summary: 'Add a new course' })
  async create(@Body() createCourseDto: CreateCourseDto): Promise<Ok<Course>> {
    const course = await this.coursesService.create(createCourseDto);
    return ZuAppResponse.Ok(course, 'Course Created', '201');
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single course' })
  async findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Ok<Course>> {
    const course = await this.coursesService.findOne(id);
    return ZuAppResponse.Ok(course, 'Ok', '200');
  }

  @Get()
  @ApiOperation({ summary: 'Get all courses' })
  async findAll(): Promise<Ok<Course[]>> {
    const courses = await this.coursesService.findAll();
    return ZuAppResponse.Ok(courses, 'Ok', '200');
  }
}
