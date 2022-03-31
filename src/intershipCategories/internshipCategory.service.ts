import { Injectable } from '@nestjs/common';
import { InternshipCategory } from '../entities/intershipCategory.entity';
import { InternshipCategoryDto } from './dto/internshipCategory.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class InternshipCategoryService {
  constructor(
    @InjectRepository(InternshipCategory)
    private readonly internshipCategoryRepository: Repository<InternshipCategory>,
  ) {}

  async findAll(): Promise<InternshipCategory[]> {
    return await this.internshipCategoryRepository.find();
  }
  // this gets all internship categories available for selection

  async addCategory(
    internshipCategory: InternshipCategoryDto,
  ): Promise<InternshipCategory> {
    const newCategory =
      this.internshipCategoryRepository.create(internshipCategory);
    return await this.internshipCategoryRepository.save(newCategory);
  }
  // this add a new category into the internship category list

  async findOneByCatergoryName(
    categoryName: string,
  ): Promise<InternshipCategory> {
    return await this.internshipCategoryRepository.findOne({
      where: { categoryName },
      relations: ['waiting'],
      // relations options displays the waitlist entry under the fetched category
    });
  }
  // this fetches an internship category

  async findOneCategoryById(id: string): Promise<InternshipCategory> {
    return await this.internshipCategoryRepository.findOne({
      where: { id },
      relations: ['waiting'],
      // relations options displays the waitlist entry array under the fetched category
    });
  }
  //this fetches an internship category via the id on the request paramenter
}
