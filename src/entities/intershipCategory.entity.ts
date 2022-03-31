import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Waitlist } from '../entities/waitlist.entity';

@Entity()
export class InternshipCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  categoryName: string;

  @OneToMany(() => Waitlist, (wait) => wait.category)
  waiting: Waitlist[];
  // this maps the internship category with the array of waitlist under this currrent category
}
