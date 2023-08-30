import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductStatus } from 'src/products/enums/product-status.enum';
import { Wishlist } from './Wishlist';
import { OrderItem } from './OrderItem';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  desc: string;

  @Column()
  status: ProductStatus;

  @Column()
  featuredImg: string;

  @Column('simple-array')
  galleryImg: string[];

  @Column()
  unit: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  salePrice: number;

  @Column()
  quantity: number;

  @Column({ unique: true })
  sku: string;

  @Column()
  slug: string;

  @OneToMany(() => Wishlist, (wishlist) => wishlist.product)
  wishlist: Wishlist[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems: OrderItem[];
}
