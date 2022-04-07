import { SharedEntity } from '../common/model/sharedEntity';
import { Entity, Column, ManyToOne,  } from 'typeorm';
import { InternshipCategory } from '../entities/intershipCategory.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Waitlist extends SharedEntity {
 
  @ApiProperty()
  @Column({unique: true,})
  email: string;
  
  @ManyToOne(() => InternshipCategory, (internCat) => internCat.categoryName)
  category: InternshipCategory;
  // this maps the waitlist entry with the internship category selected during adding the entry into the waitlist array
}
