import { InternshipCategory } from '../../entities/intershipCategory.entity';
import { IsEmail } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class WaitlistDto {
  // id?: string;

  @IsEmail()
  @ApiProperty()
  email: string;
  
  @ApiPropertyOptional()
  @Transform(({ value }) => value.toUpperCase())
  category?: string;
}
