import { Body, Controller, Get, Param, Post, ParseUUIDPipe } from '@nestjs/common';
import { WaitlistsService } from '../waitlist/waitlist.service';
import { WaitlistDto } from '../waitlist/dto/waitlist.dto';
import { Waitlist } from '../waitlist/waitlist.entity';


@Controller('waitlist')
export class WaitlistController {
    
    constructor (private readonly waitlistService: WaitlistsService) {}

    @Get()
    async showWaitlist(): Promise<Waitlist[]> {
      const waitingList = await this.waitlistService.findAll()
      return waitingList
    }
    @Post()
    async joinWaitlist(@Body() waitlist: WaitlistDto) {
      const waiter = await this.waitlistService.addToWaitlist(waitlist)
      return waiter
  
    }

}