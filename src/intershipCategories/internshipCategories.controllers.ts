import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ParseUUIDPipe,
} from '@nestjs/common';
import { InternshipCategoryService } from '../intershipCategories/internshipCategory.service';
import { InternshipCategory } from '../entities/intershipCategory.entity';
import { InternshipCategoryDto } from '../intershipCategories/dto/internshipCategory.dto';

@Controller('/intcat')
export class InternshipCategoryContoller {
  constructor(
    private readonly internshipcategoryService: InternshipCategoryService,
  ) {}

  @Get()
  async allCategories(): Promise<InternshipCategory[]> {
    const internshipCategories = await this.internshipcategoryService.findAll();
    return internshipCategories;
  }
  @Post('')
  async addIntCatergory(@Body() internshipCategory: InternshipCategoryDto) {
    const newCategory = await this.internshipcategoryService.addCategory(
      internshipCategory,
    );
    return newCategory;
  }

  @Get('/:id')
  async showOneCategorybyId(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.internshipcategoryService.findOneCategoryById(id);
  }

  @Get('name')
  async showOneCategoryByName(
    @Body() internshipCategory: InternshipCategoryDto,
  ) {
    return await this.internshipcategoryService.findOneByCatergoryName(
      internshipCategory.categoryName,
    );
  }
}
