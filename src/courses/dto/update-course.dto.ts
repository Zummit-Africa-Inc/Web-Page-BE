import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Difficulty } from '../../common/enums/difficulty.enum';
import { CreateCourseDto } from './create-course.dto';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
  @ApiPropertyOptional()
  students: string[];

  @ApiPropertyOptional()
  rating: number;

  @ApiPropertyOptional()
  title: string;

  @ApiPropertyOptional()
  description: string;

  @ApiPropertyOptional()
  price: number;

  @ApiPropertyOptional()
  tutor: string;

  @ApiPropertyOptional({ default: 'easy' })
  difficulty: Difficulty;

  @ApiPropertyOptional()
  duration: number;

  @ApiPropertyOptional()
  topics: string[];

  @ApiPropertyOptional()
  language: string;
}
