import { SharedEntity } from '../common/model/sharedEntity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Waitlist } from '../entities/waitlist.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class InternshipCategory extends SharedEntity{
  @ApiProperty()
  @Column({
    unique: true,
  })
  categoryName: string;
  
  @OneToMany(() => Waitlist, (wait) => wait.category)
  waiting: Waitlist[];
  // this maps the internship category with the array of waitlist under this currrent category
}
