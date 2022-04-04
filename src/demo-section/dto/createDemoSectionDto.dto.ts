import { ApiProperty } from '@nestjs/swagger';

export class CreateDemoSectionDto {
  @ApiProperty({ required: false })
  fullName?: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ required: false })
  companyName?: string;

  @ApiProperty({ required: false })
  message?: string;
}
