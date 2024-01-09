import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItem } from './OrderItem.entity';
import { User } from './User.entity';
import { OrderStatus } from 'src/orders/enums/order-status.enum';
import { PaymentMethod } from 'src/orders/enums/payment-method.enum';
import { Address } from './Address.entity';
import { generateTrackingNo } from 'src/utils/generate-tracking-no';
import { PaymentStatus } from 'src/orders/enums/payment-status.enum';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: generateTrackingNo() })
  tracking_no: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  order_date: Date;

  @Column({ default: OrderStatus.Pending })
  order_status: OrderStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  delivery_fee: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column()
  payment_status: PaymentStatus;

  @Column()
  payment_method: PaymentMethod;

  @ManyToOne(() => Address, (address) => address.id)
  shippingAddress: Address;

  @ManyToOne(() => Address, (address) => address.id)
  billingAddress: Address;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    onDelete: 'CASCADE',
  })
  orderItems: OrderItem[];

  @ManyToOne(() => User, (user) => user.orders)
  user: User;
}
