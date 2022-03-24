import { Waitlist } from "src/waitlist/waitlist.entity"

export class InternshipCategoryDto {
    id?: string
    categoryName: string
    waiting?: Waitlist[]
}