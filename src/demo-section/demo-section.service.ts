import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ZuAppResponse } from 'src/common/helpers/response';
import { DemoSectionRepository } from 'src/database/repository/demo-section.repository';
import { DemoSection } from '../entities/demo-section.entity';
import { CreateDemoSectionDto } from './dto/createDemoSectionDto.dto';

@Injectable()
export class DemoSectionService {
  constructor(private readonly demoSectionRepository: DemoSectionRepository) {}

  async create(payload: CreateDemoSectionDto): Promise<DemoSection> {
    //first check of demo exists, throw an error if it does
    const demo = await this.demoSectionRepository.findOne({
      where: { email: payload.email },
    });
    if (demo) {
      throw new BadRequestException(
        ZuAppResponse.BadRequest(
          'Existing Values',
          'A demo has already been requested by this email',
        ),
      );
    }
    //create a new demo
    const newDemo = this.demoSectionRepository.create(payload);
    return await this.demoSectionRepository.save(newDemo);
  }

  //Find all users in the db
  async findAll(): Promise<DemoSection[]> {
    return await this.demoSectionRepository.find();
  }

  //Find one user by Id
  async findOneById(id: string): Promise<DemoSection> {
    const demo = await this.demoSectionRepository.findOne({ where: { id } });
    if (!demo) {
      throw new NotFoundException(
        ZuAppResponse.NotFoundRequest('Not Found', 'Demo does not exist'),
      );
    }
    return demo;
  }
}
