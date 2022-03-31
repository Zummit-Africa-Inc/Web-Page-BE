import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { InternshipCategory } from "src/entity/intershipCategory.entity";


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
    // this maps the waitlist entry with the internship category selected during adding the entry into the waitlist array

}