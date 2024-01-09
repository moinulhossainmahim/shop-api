import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductStatus } from 'src/products/enums/product-status.enum';
import { Wishlist } from './Wishlist.entity';
import { OrderItem } from './OrderItem.entity';
import { Categories } from './Categories.entity';
import { SubCategory } from './SubCategory.entity';
import { Cart } from './Cart.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

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

  @ManyToMany(() => Categories, (category) => category.products, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  @JoinTable()
  categories: Categories[];

  @ManyToMany(() => SubCategory, (subCategory) => subCategory.products, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  @JoinTable()
  subcategories: SubCategory[];

  @OneToMany(() => Cart, (cart) => cart.product)
  @JoinColumn()
  cart: Cart[];
}
