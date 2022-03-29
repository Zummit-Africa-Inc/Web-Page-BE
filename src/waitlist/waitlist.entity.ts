import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { InternshipCategory } from "src/intershipCategories/intershipCategory.entity";


@Entity()
export class Waitlist {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        unique: true
    })
    email: string;


    @ManyToOne(() => InternshipCategory, (internCat) => internCat.categoryName)
    category: InternshipCategory


}