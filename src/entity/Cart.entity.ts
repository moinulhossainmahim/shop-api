import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './Product.entity';
import { User } from './User.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  total: number;

  @Column()
  quantity: number;

  @Column()
  productId: string;

  @ManyToOne(() => Product, (product) => product.cart)
  @JoinColumn()
  product: Product;

  @ManyToOne(() => User, (user) => user.cart)
  @JoinColumn()
  user: User;
}
