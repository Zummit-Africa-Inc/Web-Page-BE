import { Register } from 'src/entities/register.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Register)
export class RegisterRepository extends Repository<Register> {}
