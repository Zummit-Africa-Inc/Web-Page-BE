import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { Difficulty } from '../../common/enums/difficulty.enum';
import { CreateCourseDto } from './create-course.dto';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
  @IsArray()
  @ApiPropertyOptional()
  students: string[];

  @ApiPropertyOptional({ nullable: true, default: 0 })
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

  @IsArray()
  @ApiPropertyOptional()
  topics: string[];

  @ApiPropertyOptional()
  language: string;
}
