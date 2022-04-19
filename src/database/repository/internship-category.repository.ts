import { InternshipCategory } from '../../entities/intershipCategory.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(InternshipCategory)
export class InternshipCategoryRepository extends Repository<InternshipCategory> {}
