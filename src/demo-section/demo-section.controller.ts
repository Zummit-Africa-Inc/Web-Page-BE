import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RckgAppResponse } from 'src/common/helpers/response/Response';
import { Ok } from 'src/common/helpers/response/ResponseType';
import { UpdateResult } from 'typeorm';
import { DemoSection } from '../entities/demo-section.entity';
import { DemoSectionService } from './demo-section.service';
import { CreateDemoSectionDto } from './dto/createDemoSectionDto.dto';
import { UpdateDemoSectionDto } from './dto/updateDemoSectionDto.dto';
@ApiTags('Demo-Section')
@Controller('/demo-section')
export class DemoSectionController {
  constructor(private readonly demoSectionService: DemoSectionService) {}

  @Post()
  async create(@Body() payload: CreateDemoSectionDto): Promise<DemoSection> {
    return this.demoSectionService.create(payload);
  }
  @ApiOkResponse({ type: DemoSection, isArray: true })
  @Get()
  async findAll(): Promise<Ok<DemoSection[]>> {
    const demos = await this.demoSectionService.findAll();
    return RckgAppResponse.Ok(demos, "Demos found", "200");
  }

  @ApiOkResponse({ type: DemoSection })
  @Get(':id')
  async findOneById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Ok<DemoSection>> {
    const demos = await this.demoSectionService.findOneById(id);
    return RckgAppResponse.Ok(demos, "Demos found", "200");
  }
}
