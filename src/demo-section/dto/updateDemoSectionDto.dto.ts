import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateDemoSectionDto } from './createDemoSectionDto.dto';

export class UpdateDemoSectionDto extends PartialType(CreateDemoSectionDto) {
  @ApiProperty({ required: false })
  id?: string;

  @ApiProperty({ required: false })
  fullName?: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ required: false })
  companyName?: string;

  @ApiProperty({ required: false })
  message?: string;
}
