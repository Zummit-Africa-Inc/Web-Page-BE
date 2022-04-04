import { DemoSection } from 'src/entities/demo-section.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(DemoSection)
export class DemoSectionRepository extends Repository<DemoSection> {}
