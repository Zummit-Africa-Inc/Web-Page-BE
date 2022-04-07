import { Demo_Requests } from 'src/entities/demo-section.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Demo_Requests)
export class DemoSectionRepository extends Repository<Demo_Requests> {}
