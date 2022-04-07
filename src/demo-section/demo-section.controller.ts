import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ZuAppResponse } from 'src/common/helpers/response/Response';
import { Ok } from 'src/common/helpers/response/ResponseType';
import { Demo_Requests } from '../entities/demo-section.entity';
import { DemoSectionService } from './demo-section.service';
import { CreateDemoSectionDto } from './dto/createDemoSectionDto.dto';
@ApiTags('Demo_Requests')
@Controller('/demo_requests')
export class DemoSectionController {
  constructor(private readonly demoSectionService: DemoSectionService) {}

  @Post()
  async create(
    @Body() payload: CreateDemoSectionDto,
  ): Promise<Ok<Demo_Requests>> {
    const demo = await this.demoSectionService.create(payload);
    return ZuAppResponse.Ok(demo, 'Demo Created', '200');
  }

  @ApiOkResponse({ type: Demo_Requests, isArray: true })
  @Get()
  async findAll(): Promise<Ok<Demo_Requests[]>> {
    const demos = await this.demoSectionService.findAll();
    return ZuAppResponse.Ok(demos, 'Demos found', '200');
  }

  @ApiOkResponse({ type: Demo_Requests })
  @Get(':id')
  async findOneById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Ok<Demo_Requests>> {
    const demo = await this.demoSectionService.findOneById(id);
    return ZuAppResponse.Ok(demo, 'Demo found', '200');
  }
}
