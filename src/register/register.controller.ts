import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterService } from './register.service';
import { CreateRegisterDto } from './dto/create-register.dto';
import { Register } from 'src/entities/register.entity';
import { Ok } from 'src/common/helpers/response/ResponseType';
import { ZuAppResponse } from 'src/common/helpers/response';

@ApiTags('Register')
@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @ApiOperation({ summary: 'register an account' })
  @Post()
  async create(@Body() payload: CreateRegisterDto): Promise<Ok<Register>> {
    const data = await this.registerService.create(payload);
    return ZuAppResponse.Ok(data, 'Account created', '201');
  }

  @ApiOkResponse({ type: Register, isArray: true })
  @ApiOperation({ summary: 'get all accounts' })
  @Get()
  async findAll(): Promise<Ok<Register[]>> {
    const accounts = await this.registerService.findAll();
    return ZuAppResponse.Ok(accounts, 'Accounts found', '200');
  }

  @ApiOkResponse({ type: Register })
  @ApiOperation({ summary: 'get an account by id' })
  @Get(':id')
  async findOneById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Ok<Register>> {
    const account = await this.registerService.findOneById(id);
    return ZuAppResponse.Ok(account, 'Account found', '200');
  }
}
