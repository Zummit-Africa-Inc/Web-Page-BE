import { InternshipCategory } from '../../entities/intershipCategory.entity';

export class WaitlistDto {
  id?: string;
  email: string;
  category: InternshipCategory;
}
