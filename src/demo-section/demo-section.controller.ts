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
import { DemoSection } from '../entities/demo-section.entity';
import { DemoSectionService } from './demo-section.service';
import { CreateDemoSectionDto } from './dto/createDemoSectionDto.dto';
@ApiTags('Demo-Section')
@Controller('/demo-section')
export class DemoSectionController {
  constructor(private readonly demoSectionService: DemoSectionService) {}

  @Post()
  async create(
    @Body() payload: CreateDemoSectionDto,
  ): Promise<Ok<DemoSection>> {
    const demo = await this.demoSectionService.create(payload);
    return ZuAppResponse.Ok(demo, 'Demo Created', '200');
  }

  @ApiOkResponse({ type: DemoSection, isArray: true })
  @Get()
  async findAll(): Promise<Ok<DemoSection[]>> {
    const demos = await this.demoSectionService.findAll();
    return ZuAppResponse.Ok(demos, 'Demos found', '200');
  }

  @ApiOkResponse({ type: DemoSection })
  @Get(':id')
  async findOneById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Ok<DemoSection>> {
    const demo = await this.demoSectionService.findOneById(id);
    return ZuAppResponse.Ok(demo, 'Demo found', '200');
  }
}
