import { Course } from 'src/entities/course.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Course)
export class CoursesRepository extends Repository<Course> {}
