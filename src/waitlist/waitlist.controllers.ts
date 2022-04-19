import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
} from '@nestjs/common';
import { WaitlistsService } from '../waitlist/waitlist.service';
import { WaitlistDto } from '../waitlist/dto/waitlist.dto';
import { Waitlist } from '../entities/waitlist.entity';
import { ZuAppResponse } from '../common/helpers/response/Response';
import { Ok } from '../common/helpers/response/ResponseType';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';


@ApiTags('Waitlist')
@Controller('waitlist')
export class WaitlistController {
  constructor(private readonly waitlistService: WaitlistsService) {}

  @ApiOkResponse({type: Waitlist, isArray: true})
  @ApiOperation({ summary: 'Get all Waislists ' })
  @Get()
  async showWaitlist(): Promise<Ok<Waitlist[]>> {
    const waitingList = await this.waitlistService.findAll();
    return ZuAppResponse.Ok(waitingList, "List Of all in waitlist", "200");
  }

  @Post()
  @ApiOperation({ summary: 'Add an email to waitlist' })
  async joinWaitlist(@Body() waitlist: WaitlistDto): Promise<Ok<Waitlist>> {
    const waiter = await this.waitlistService.addToWaitlist(waitlist);
    return ZuAppResponse.Ok(waiter, "Added to waitlist", "201");
  }
 
}
