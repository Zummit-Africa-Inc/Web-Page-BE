import { Waitlist } from "src/entity/waitlist.entity"

export class InternshipCategoryDto {
    id?: string
    categoryName: string
    waiting?: Waitlist[]
}