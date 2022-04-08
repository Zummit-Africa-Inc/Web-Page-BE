import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class InternshipCategoryDto {
  @ApiProperty()
  categoryName: string;
  
}
