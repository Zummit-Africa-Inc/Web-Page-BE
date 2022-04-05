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
import { Ok } from 'src/common/helpers/response/ResponseType';
import { ZuAppResponse } from 'src/common/helpers/response/Response';

@Controller('/intcat')
export class InternshipCategoryContoller {
  constructor(
    private readonly internshipcategoryService: InternshipCategoryService,
  ) {}

  @Get()
  async allCategories(): Promise<Ok<InternshipCategory[]>> {
    const internshipCategories = await this.internshipcategoryService.findAll();
    return ZuAppResponse.Ok(internshipCategories, "List Of all in internship categories", "200");
  }
  @Post()
  async addIntCatergory(@Body() internshipCategory: InternshipCategoryDto):Promise<Ok<InternshipCategory>> {
    const newCategory = await this.internshipcategoryService.addCategory(
      internshipCategory,
    );
    return ZuAppResponse.Ok(newCategory, "List Of all in internship categories", "201");
  }

  @Get('/:id')
  async showOneCategorybyId(@Param('id', new ParseUUIDPipe()) id: string) {
    const category = await this.internshipcategoryService.findOneCategoryById(id);
    return ZuAppResponse.Ok(category, "Category found", "200");
  }

  @Get('name')
  async showOneCategoryByName(
    @Body() internshipCategory: InternshipCategoryDto,
  ) {
    const category = await this.internshipcategoryService.findOneByCatergoryName(
      internshipCategory.categoryName,
    );
    return ZuAppResponse.Ok(category, "Category found", "200");
  }
}
