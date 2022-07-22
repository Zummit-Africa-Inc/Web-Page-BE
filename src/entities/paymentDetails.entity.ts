import { SharedEntity } from '../common/model/sharedEntity';
import { Entity, Column } from 'typeorm';
import { Customer } from 'src/common/Interfaces/customer.interface';

@Entity()
export class PaymentDetails extends SharedEntity {
  @Column()
  paystackId: number;

  @Column()
  status: string;

  @Column()
  reference: string;

  @Column()
  amount: number;

  @Column()
  gateway_response: string;

  @Column()
  channel: string;

  @Column()
  currency: string;

  @Column()
  ip_address: string;

  @Column()
  fees: number;

  @Column('jsonb', { default: {} })
  customer: Customer;

  @Column()
  paidAt: Date;

  @Column()
  metadata: string;
}
