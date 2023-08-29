import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';
import { Product } from './Product';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product, (product) => product.wishlist)
  product: Product;

  @ManyToOne(() => User, (user) => user.wishlist)
  user: User;
}
