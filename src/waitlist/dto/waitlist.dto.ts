import { InternshipCategory } from "src/intershipCategories/intershipCategory.entity"

export class WaitlistDto {
    id?: string
    email: string
    category: InternshipCategory
}