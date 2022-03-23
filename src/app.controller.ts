import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApplicantsService } from './applicants/applicant.service';
import { ApplicantDto } from './applicants/dto/applicant.dto';
import { Applicant } from './applicants/applicant.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
          private readonly applicantsService: ApplicantsService
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
  async joinWaitingList(@Body() applicant: ApplicantDto) {
    const result = await this.applicantsService.addApplicant(applicant)
    return result
  }


}
