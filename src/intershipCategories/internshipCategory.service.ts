import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InternshipCategory } from '../entities/intershipCategory.entity';
import { InternshipCategoryDto } from './dto/internshipCategory.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ZuAppResponse } from 'src/common/helpers/response';
import { InternshipCategoryRepository } from 'src/database/repository/internship-category.repository';

@Injectable()
export class InternshipCategoryService {
  constructor(
    private readonly internshipCategoryRepository: InternshipCategoryRepository,
  ) {}

  async findAll(): Promise<InternshipCategory[]> {
    return await this.internshipCategoryRepository.find();
  }
  // this gets all internship categories available for selection

  async addCategory(
    internshipCategory: InternshipCategoryDto,
  ): Promise<InternshipCategory> {
    //check if the category already exists
    const existingCategory = await this.internshipCategoryRepository.find({
      where: { categoryName: internshipCategory.categoryName },
    });
    if (existingCategory) {
      throw new BadRequestException(
        ZuAppResponse.BadRequest(
          'Duplicate Values',
          'A category with this name already exists',
        ),
      );
    }
    const newCategory =
      this.internshipCategoryRepository.create(internshipCategory);
    return await this.internshipCategoryRepository.save(newCategory);
  }
  // this add a new category into the internship category list

  async findOneByCatergoryName(
    categoryName: string,
  ): Promise<InternshipCategory> {
    const category = await this.internshipCategoryRepository.findOne({
      where: { categoryName },
      relations: ['waiting'],
      // relations options displays the waitlist entry under the fetched category
    });
    if (!category) {
      throw new NotFoundException(
        ZuAppResponse.NotFoundRequest(
          'Not Found',
          'This category does not exist',
        ),
      );
    }
    return category;
  }
  // this fetches an internship category

  async findOneCategoryById(id: string): Promise<InternshipCategory> {
    const category = await this.internshipCategoryRepository.findOne({
      where: { id },
      relations: ['waiting'],
      // relations options displays the waitlist entry array under the fetched category
    });
    if (!category) {
      throw new BadRequestException(
        ZuAppResponse.NotFoundRequest(
          'Not Found',
          'This category does not exist',
        ),
      );
    }
    return category;
  }
  //this fetches an internship category via the id on the request paramenter
}
