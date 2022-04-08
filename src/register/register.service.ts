import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as argon from 'argon2';
import { CreateRegisterDto } from './dto/create-register.dto';
import { Register } from 'src/entities/register.entity';
import { ZuAppResponse } from 'src/common/helpers/response';
import { RegisterRepository } from 'src/database/repository/register.repository';

@Injectable()
export class RegisterService {
  constructor(private readonly registerRepository: RegisterRepository) {}

  async create(payload: CreateRegisterDto): Promise<Register> {
    //First check if account exists, throw an error if it does
    const account = await this.registerRepository.findOne({
      where: { email: payload.email },
    });
    if (account) {
      throw new BadRequestException(
        ZuAppResponse.BadRequest(
          'Existing Values',
          'An Account with this email already exists',
        ),
      );
    }
    //Hash the password
    const hash = await argon.hash(payload.password);
    const newAccount = { ...payload, hash };

    //create a new account
    const result = this.registerRepository.create(newAccount);
    await this.registerRepository.save(result);
    delete result.hash;
    return result;
  }

  //Find all accounts in the db
  async findAll(): Promise<any> {
    const accounts = await this.registerRepository.find();
    const allAccounts = accounts.map((account) => {
      delete account.hash;
      return account;
    });
    return allAccounts;
  }

  //Find one account by Id
  async findOneById(id: string): Promise<Register> {
    const account = await this.registerRepository.findOne({
      where: { id },
    });
    if (!account) {
      throw new NotFoundException(
        ZuAppResponse.NotFoundRequest('Not Found', 'Account does not exist'),
      );
    }
    delete account.hash;
    return account;
  }
}
