import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItem } from './OrderItem';
import { User } from './User';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tracking_no: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  order_date: Date;

  @Column()
  order_status: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  delivery_fee: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  tax: number;

  @Column()
  payment_method: string;

  @Column()
  payment_status: string;

  @Column('text')
  shipping_address: string;

  @Column('text')
  billing_address: string;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  @ManyToOne(() => User, (user) => user.orders)
  user: User;
}
