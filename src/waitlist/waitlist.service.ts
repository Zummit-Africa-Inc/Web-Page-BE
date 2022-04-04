import { BadRequestException, Injectable } from '@nestjs/common';
import { Waitlist } from '../entities/waitlist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WaitlistDto } from './dto/waitlist.dto';
import { RckgAppResponse } from 'src/common/helpers/response';

@Injectable()
export class WaitlistsService {
  constructor(
    @InjectRepository(Waitlist)
    private readonly waitlistRepository: Repository<Waitlist>,
  ) {}

  async findAll(): Promise<Waitlist[]> {
    return await this.waitlistRepository.find({
      relations: ['category'],
    });
    // the relations option displays the internship category each waitlist entry belongs to
  }
  // gets all email entries of the waitlist

  async addToWaitlist(waitlist: WaitlistDto): Promise<Waitlist> {
    //check if email already exists
    const existingEmail = await this.waitlistRepository.find({ where: { email:waitlist.email}})
    if(existingEmail){
      throw new BadRequestException(
        RckgAppResponse.BadRequest( " Duplicate Values", "This email has already been added to the waitlist")
      )
    }
    const newWait = this.waitlistRepository.create(waitlist);
    return await this.waitlistRepository.save(newWait);
  }
  // adds an email entry to the waitlist
}
