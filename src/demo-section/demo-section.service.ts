import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ZuAppResponse } from 'src/common/helpers/response';
import { DemoSectionRepository } from 'src/database/repository/demo-section.repository';
import { MailService } from 'src/mail/mail.service';
import { Demo_Requests } from '../entities/demo-section.entity';
import { CreateDemoSectionDto } from './dto/createDemoSectionDto.dto';

@Injectable()
export class DemoSectionService {
  constructor(
    private readonly demoSectionRepository: DemoSectionRepository,
    private mailService: MailService,
  ) {}

  async create(payload: CreateDemoSectionDto): Promise<Demo_Requests> {
    //First check if demo exists, throw an error if it does
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
    /* Creating a new demo section and then send a confirmation email to the user. */
    const newDemo = this.demoSectionRepository.create(payload);
    await this.mailService.sendUserConfirmation(newDemo);
    return await this.demoSectionRepository.save(newDemo);
  }

  //Find all users in the db
  async findAll(): Promise<Demo_Requests[]> {
    return await this.demoSectionRepository.find();
  }

  //Find one user by Id
  async findOneById(id: string): Promise<Demo_Requests> {
    const demo = await this.demoSectionRepository.findOne({ where: { id } });
    if (!demo) {
      throw new NotFoundException(
        ZuAppResponse.NotFoundRequest('Not Found', 'Demo does not exist'),
      );
    }
    return demo;
  }
}
