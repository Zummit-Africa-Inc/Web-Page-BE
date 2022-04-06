import { InternshipCategory } from '../../entities/intershipCategory.entity';
import { IsEmail } from 'class-validator';

export class WaitlistDto {
  // id?: string;

  @IsEmail()
  email: string;
  
  category: InternshipCategory;
}
