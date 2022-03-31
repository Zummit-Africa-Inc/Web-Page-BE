import { Module } from "@nestjs/common";
import { InternshipCategoryService } from "./internshipCategory.service";
import { InternshipCategory } from "../entity/intershipCategory.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InternshipCategoryContoller } from "./internshipCategories.controllers";

@Module({
imports: [TypeOrmModule.forFeature([InternshipCategory])],
providers: [InternshipCategoryService],
exports: [InternshipCategoryService],
controllers: [InternshipCategoryContoller]
})

export class InternshipCategoryModule{}