import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class CreateDemoSectionDto {
  @ApiPropertyOptional()
  fullName?: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiPropertyOptional()
  companyName?: string;

  @ApiPropertyOptional()
  message?: string;
}
