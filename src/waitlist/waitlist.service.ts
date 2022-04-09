import { BadRequestException, Injectable } from '@nestjs/common';
import { Waitlist } from '../entities/waitlist.entity';
import { WaitlistDto } from './dto/waitlist.dto';
import { ZuAppResponse } from 'src/common/helpers/response';
import { WaitlistRepository } from 'src/database/repository/waitlist.repository';
import { InternshipCategoryRepository } from 'src/database/repository/internship-category.repository';

@Injectable()
export class WaitlistsService {
  constructor(
    private readonly waitlistRepository: WaitlistRepository,
    private readonly internshipCategoryRepository: InternshipCategoryRepository,
  ) {}

  async findAll(): Promise<Waitlist[]> {
    return await this.waitlistRepository.find({
      relations: ['category'],
    });
    // the relations option displays the internship category each waitlist entry belongs to
  }
  // gets all email entries of the waitlist

  async addToWaitlist({email, category}: WaitlistDto): Promise<Waitlist> {
    //check if email already exists
    const existingEmail = await this.waitlistRepository.findOne({ where: { email }})
    if(existingEmail){
      throw new BadRequestException(
        ZuAppResponse.BadRequest( " Duplicate Values", "This email has already been added to the waitlist")
      )
    }

    //check if the category exist
    const existingCategory = await this.internshipCategoryRepository.findOne({ where : { categoryName: category}});
    if(!existingCategory){
      throw new BadRequestException(
        ZuAppResponse.BadRequest( "Invalid Category", "This category does not exist")
      )
    }
    const newWait = this.waitlistRepository.create({ email, category: existingCategory});
    return await this.waitlistRepository.save(newWait);
  }
  // adds an email entry to the waitlist


}
