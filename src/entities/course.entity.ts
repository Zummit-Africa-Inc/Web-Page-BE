import { Difficulty } from '../common/enums/difficulty.enum';
import { SharedEntity } from '../common/model/sharedEntity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Course extends SharedEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column({ nullable: true, default: 0 })
  rating: number;

  @Column({ nullable: true })
  tutor: string;

  @Column({
    type: 'enum',
    enum: Difficulty,
    default: Difficulty.Easy,
  })
  difficulty: Difficulty;

  @Column()
  duration: number;

  @Column('text', { array: true, nullable: true, default: [] })
  topics: string[];

  @Column('text', { array: true, nullable: true, default: [] })
  students: string[];

  @Column({ nullable: true })
  language: string;
}
