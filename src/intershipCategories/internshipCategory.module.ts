import { Module } from '@nestjs/common';
import { InternshipCategoryService } from './internshipCategory.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InternshipCategoryContoller } from './internshipCategories.controllers';
import { InternshipCategoryRepository } from '../database/repository/internship-category.repository';




@Module({
  imports: [TypeOrmModule.forFeature([InternshipCategoryRepository])],
  providers: [
    InternshipCategoryService,
  ],
  exports: [InternshipCategoryService],
  controllers: [InternshipCategoryContoller],
})
export class InternshipCategoryModule {}
