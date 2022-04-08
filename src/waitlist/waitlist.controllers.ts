import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { WaitlistsService } from '../waitlist/waitlist.service';
import { WaitlistDto } from '../waitlist/dto/waitlist.dto';
import { Waitlist } from '../entities/waitlist.entity';
import { ZuAppResponse } from 'src/common/helpers/response/Response';
import { Ok } from 'src/common/helpers/response/ResponseType';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('Waitlist')
@Controller('waitlist')
export class WaitlistController {
  constructor(private readonly waitlistService: WaitlistsService) {}

  @ApiOkResponse({type: Waitlist, isArray: true})
  @Get()
  async showWaitlist(): Promise<Ok<Waitlist[]>> {
    const waitingList = await this.waitlistService.findAll();
    return ZuAppResponse.Ok(waitingList, "List Of all in waitlist", "200");
  }

  @Post()
  async joinWaitlist(@Body() waitlist: WaitlistDto): Promise<Ok<Waitlist>> {
    const waiter = await this.waitlistService.addToWaitlist(waitlist);
    return ZuAppResponse.Ok(waiter, "Added to waitlist", "201");
  }
}
