import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ParseUUIDPipe,
} from '@nestjs/common';
import { WaitlistsService } from '../waitlist/waitlist.service';
import { WaitlistDto } from '../waitlist/dto/waitlist.dto';
import { Waitlist } from '../entities/waitlist.entity';
import { RckgAppResponse } from 'src/common/helpers/response/Response';
import { Ok } from 'src/common/helpers/response/ResponseType';

@Controller('waitlist')
export class WaitlistController {
  constructor(private readonly waitlistService: WaitlistsService) {}

  @Get()
  async showWaitlist(): Promise<Ok<Waitlist[]>> {
    const waitingList = await this.waitlistService.findAll();
    return RckgAppResponse.Ok(waitingList, "List Of all in waitlist", "200");
  }

  @Post()
  async joinWaitlist(@Body() waitlist: WaitlistDto): Promise<Ok<Waitlist>> {
    const waiter = await this.waitlistService.addToWaitlist(waitlist);
    return RckgAppResponse.Ok(waiter, "Added to waitlist", "201");
  }
}
