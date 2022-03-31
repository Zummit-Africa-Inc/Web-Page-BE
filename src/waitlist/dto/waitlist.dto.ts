import { InternshipCategory } from "src/entity/intershipCategory.entity"

export class WaitlistDto {
    id?: string
    email: string
    category: InternshipCategory
}