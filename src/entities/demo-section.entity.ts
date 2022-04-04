import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DemoSection {
  @ApiProperty({ required: false })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ required: false })
  @IsString()
  @Column()
  fullName: string;

  @ApiProperty()
  @IsEmail()
  @Column({
    unique: true,
  })
  email: string;

  @ApiProperty({ required: false })
  @Column()
  companyName: string;

  @ApiProperty({ required: false })
  @Column()
  message: string;
}
