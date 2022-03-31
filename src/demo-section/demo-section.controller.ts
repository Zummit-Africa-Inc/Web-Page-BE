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
import { UpdateResult } from 'typeorm';
import { DemoSection } from './demo-section.entity';
import { DemoSectionService } from './demo-section.service';
import { CreateDemoSectionDto } from './dto/createDemoSectionDto.dto';
import { UpdateDemoSectionDto } from './dto/updateDemoSectionDto.dto';
@ApiTags('Demo-Section')
@Controller('/demo-section')
export class DemoSectionController {
  constructor(private readonly demoSectionService: DemoSectionService) {}

  @Post()
  create(@Body() payload: CreateDemoSectionDto): Promise<DemoSection> {
    return this.demoSectionService.create(payload);
  }
  @ApiOkResponse({ type: DemoSection, isArray: true })
  @Get()
  findAll(): Promise<DemoSection[]> {
    return this.demoSectionService.findAll();
  }

  @ApiOkResponse({ type: DemoSection })
  @Get(':id')
  findOneById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<DemoSection> {
    return this.demoSectionService.findOneById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() payload: UpdateDemoSectionDto,
  ): Promise<UpdateResult> {
    return this.demoSectionService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<DemoSection> {
    return this.demoSectionService.remove(id);
  }
}
