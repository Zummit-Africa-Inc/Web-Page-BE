import { Injectable } from "@nestjs/common";
import { InternshipCategory } from "./intershipCategory.entity";
import { InternshipCategoryDto } from "./dto/internshipCategory.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class InternshipCategoryService {
    constructor(@InjectRepository(InternshipCategory) private readonly internshipCategoryRepository: Repository<InternshipCategory>,) {}


    async findAll(): Promise<InternshipCategory[]> {
        return await this.internshipCategoryRepository.find()
    }



    async addCategory(internshipCategory: InternshipCategoryDto ): Promise<InternshipCategory> {
        const newCategory = this.internshipCategoryRepository.create(internshipCategory)
        return await this.internshipCategoryRepository.save(internshipCategory)
    }

    async findOneByCatergoryName(categoryName: string): Promise<InternshipCategory> {
        return await this.internshipCategoryRepository.findOne({
            where:{ categoryName },
            relations: { waiting: {
                email: true
            } }
        })
    }

    async findOneCategoryById(id: string) : Promise<InternshipCategory> {
        return await this.internshipCategoryRepository.findOne({where: {id},  relations: { waiting: true}} )
    }
}