import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { DemoSection } from '../entities/demo-section.entity';
import { CreateDemoSectionDto } from './dto/createDemoSectionDto.dto';
import { UpdateDemoSectionDto } from './dto/updateDemoSectionDto.dto';

@Injectable()
export class DemoSectionService {
  constructor(
    @InjectRepository(DemoSection)
    private readonly demoSectionRepository: Repository<DemoSection>,
  ) {}

  async create(payload: CreateDemoSectionDto): Promise<DemoSection> {
    try {
      //Create user with payload
      const newDemo = this.demoSectionRepository.create(payload);
      return await this.demoSectionRepository.save(newDemo);
    } catch (error) {
      throw error;
    }
  }

  //Find all users in the db
  async findAll(): Promise<DemoSection[]> {
    return await this.demoSectionRepository.find();
  }

  //Find one user by Id
  async findOneById(id: string): Promise<DemoSection> {
    try {
      //Find user with the provided id
      const user = await this.demoSectionRepository.findOneOrFail({
        where: { id },
      });
      //Return User if true
      if (user) {
        return user;
      }
      //Else throw not found exception
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    } catch (error) {
      throw error;
    }
  }

  //Update a user
  async update(
    id: string,
    payload: UpdateDemoSectionDto,
  ): Promise<UpdateResult> {
    try {
      //Update and return the update result
      const update = await this.demoSectionRepository.update(id, payload);
      return update;
    } catch (error) {
      //If error,throw exception
      throw new HttpException('Something went wrong ', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string): Promise<DemoSection> {
    try {
      //Find user with the provided id
      const user = await this.demoSectionRepository.findOneOrFail({
        where: { id },
      });
      //Return deleted user if true
      if (user) {
        return await this.demoSectionRepository.remove(user);
      }
      //Else throw not found exception
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    } catch (error) {
      throw error;
    }
  }
}
