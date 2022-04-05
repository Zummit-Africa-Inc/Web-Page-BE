import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { SharedEntity } from '../common/model/sharedEntity';
import { Entity, Column } from 'typeorm';

@Entity()
export class DemoSection extends SharedEntity {
  //Optional field for Full Names
  @ApiPropertyOptional()
  @IsString()
  @Column()
  fullName: string;

  //Required field for Email
  @ApiProperty()
  @IsEmail()
  @Column({
    unique: true,
  })
  email: string;

  //Optional field for Company Name
  @ApiPropertyOptional()
  @Column()
  companyName: string;

  //Optional field for message
  @ApiPropertyOptional()
  @Column()
  message: string;
}
