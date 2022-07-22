import { PaymentDetails } from 'src/entities/paymentDetails.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(PaymentDetails)
export class PaymentDetailsRepository extends Repository<PaymentDetails> {}
