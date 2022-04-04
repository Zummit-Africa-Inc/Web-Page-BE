import { Waitlist } from 'src/entities/waitlist.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Waitlist)
export class WaitlistRepository extends Repository<Waitlist> {}
