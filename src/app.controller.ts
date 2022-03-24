import { Body, Controller, Get, Param, Post, ParseUUIDPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { ApplicantsService } from './applicants/applicant.service';
import { ApplicantDto } from './applicants/dto/applicant.dto';
import { Applicant } from './applicants/applicant.entity';
import { InternshipCategoryService } from './intershipCategories/internshipCategory.service';
import { WaitlistsService } from './waitlist/waitlist.service';
import { Waitlist } from './waitlist/waitlist.entity';
import { InternshipCategory } from './intershipCategories/intershipCategory.entity';
import { WaitlistDto } from './waitlist/dto/waitlist.dto';
import { InternshipCategoryDto } from './intershipCategories/dto/internshipCategory.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
          private readonly applicantsService: ApplicantsService,
          private readonly internshipcategoryService: InternshipCategoryService,
          private readonly waitlistService: WaitlistsService
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }



  @Get('/applicant')
  async listAllApplicants(): Promise<Applicant[]> {
    const allApplicants = await this.applicantsService.findAll()
    return allApplicants
  }

  @Post('/applicant')
  async joinApplicantList(@Body() applicant: ApplicantDto) {
    const result = await this.applicantsService.addApplicant(applicant)
    return result
  }

  @Get('/waitlist')
  async showWaitlist(): Promise<Waitlist[]> {
    const waitingList = await this.waitlistService.findAll()
    return waitingList
  }
  @Post('/waitlist')
  async joinWaitlist(@Body() waitlist: WaitlistDto) {
    const waiter = await this.waitlistService.addToWaitlist(waitlist)
    return waiter

  }

  @Get('/intcat')
  async allCategories(): Promise<InternshipCategory[]> {
    const internshipCategories = await this.internshipcategoryService.findAll()
    return internshipCategories
  }
  @Post('/intcat')
  async addIntCatergory(@Body() internshipCategory: InternshipCategoryDto) {
    const newCategory = await this.internshipcategoryService.addCategory(internshipCategory)
    return newCategory

  }

  @Get('/intcat/id/:id')
  async showOneCategorybyId(
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
      return await this.internshipcategoryService.findOneCategoryById(id)

  }

  @Get('/intcat/name')
  async showOneCategoryByName(
    // @Param('one-category', new ParseUUIDPipe()) catId: string,
    @Body() internshipCategory: InternshipCategoryDto

  ) {
      return await this.internshipcategoryService.findOneByCatergoryName(internshipCategory.categoryName)
  }
}
