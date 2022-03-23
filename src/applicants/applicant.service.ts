import { Injectable } from "@nestjs/common";
import { Applicant } from "./applicant.entity";
import { ApplicantDto } from "./dto/applicant.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ApplicantsService {
    constructor(@InjectRepository(Applicant) private readonly applicantRepository: Repository<Applicant>,) {}


    async findAll(): Promise<Applicant[]> {
        return await this.applicantRepository.find()
    }



    async addApplicant(applicant: ApplicantDto): Promise<Applicant> {
        const newApplicant = this.applicantRepository.create(applicant)
        return await this.applicantRepository.save(newApplicant)
    }
}