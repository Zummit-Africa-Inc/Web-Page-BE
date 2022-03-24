import { Module } from "@nestjs/common";
import { InternshipCategoryService } from "./internshipCategory.service";
import { InternshipCategory } from "./intershipCategory.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
imports: [TypeOrmModule.forFeature([InternshipCategory])],
providers: [InternshipCategoryService],
exports: [InternshipCategoryService, TypeOrmModule],
controllers: []
})

export class InternshipCategoryModule{}