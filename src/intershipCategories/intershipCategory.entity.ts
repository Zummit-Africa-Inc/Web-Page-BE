import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Waitlist } from "src/waitlist/waitlist.entity";

@Entity()
export class InternshipCategory {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        unique: true
    })
    categoryName: string;

    @OneToMany(() => Waitlist, (wait) => wait.category)
    waiting: Waitlist[]
}