import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { Difficulty } from '../../common/enums/difficulty.enum';

export class CreateCourseDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  tutor: string;

  @ApiProperty({ default: 'easy' })
  difficulty: Difficulty;

  @ApiProperty()
  duration: number;

  @IsArray()
  @ApiProperty()
  topics: string[];

  @ApiProperty()
  language: string;
}
