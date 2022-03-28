import { Injectable } from "@nestjs/common"
import { Waitlist } from "./waitlist.entity"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { WaitlistDto } from "./dto/waitlist.dto"

@Injectable()
export class WaitlistsService {
    constructor(@InjectRepository(Waitlist) private readonly waitlistRepository: Repository<Waitlist>,
   ) {}


    async findAll(): Promise<Waitlist[]> {
        return await this.waitlistRepository.find({
            relations: { 
                category:true
            }
        })
    }



    async addToWaitlist(waitlist: WaitlistDto): Promise<Waitlist> {
        const newWait = this.waitlistRepository.create(waitlist)
        return await this.waitlistRepository.save(newWait)
    }
}