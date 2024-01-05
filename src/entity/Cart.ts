import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './Product';
import { User } from './User';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  total: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Product, (product) => product.cart)
  @JoinColumn()
  item: Product;

  @ManyToOne(() => User, (user) => user.cart)
  @JoinColumn()
  user: User;
}
