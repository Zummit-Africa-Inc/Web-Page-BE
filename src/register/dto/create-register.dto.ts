import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { Column } from 'typeorm';

export class CreateRegisterDto {
  //Required field for Full Names
  @ApiProperty()
  @IsString()
  @Column()
  empName: string;

  //Required field for Email
  @ApiProperty()
  @IsEmail()
  @Column({
    unique: true,
  })
  email: string;

  //Required field for password
  @ApiProperty()
  @IsString()
  @Column()
  password: string;

  //Required field for Phone
  @ApiProperty()
  @IsString()
  @Column()
  phone: string;

  //Required field for City
  @ApiProperty()
  @IsString()
  @Column()
  city: string;

  //Required field for Country
  @ApiProperty()
  @IsString()
  @Column()
  country: string;

  //Required field for Gender
  @ApiProperty()
  @IsString()
  @Column()
  gender: string;

  //Required field for Department
  @ApiProperty()
  @IsString()
  @Column()
  department: string;

  //Optional field for date of birth
  @ApiPropertyOptional()
  @IsString()
  @Column()
  dateOfBirth?: string;

  //Optional field for Joining date
  @ApiPropertyOptional()
  @IsString()
  @Column()
  joiningDate?: string;
}
