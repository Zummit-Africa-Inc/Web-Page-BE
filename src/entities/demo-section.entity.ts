import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { SharedEntity } from 'src/common/model/sharedEntity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DemoSection extends SharedEntity {
  @ApiPropertyOptional()
  @IsString()
  @Column()
  fullName: string;

  @ApiProperty()
  @IsEmail()
  @Column({
    unique: true,
  })
  email: string;

  @ApiPropertyOptional()
  @Column()
  companyName: string;

  @ApiPropertyOptional()
  @Column()
  message: string;
}
