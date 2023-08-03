import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ProductStatus } from './enums/product-status.enum';

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

  @Column()
  price: string;

  @Column()
  salePrice: string;

  @Column()
  quantity: number;

  @Column({ unique: true })
  sku: string;

  @Column()
  slug: string;
}
