import {Entity, Column, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class Applicant {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        unique: true
    })
    email: string;


    @Column({
        type: 'enum',
        enum: ['male', 'female']
    })
    gender: string;

    @Column({
        type: 'enum',
        enum: ['web development', 'Machine Learning', 'Data Science']
    })
    specials: string;
}