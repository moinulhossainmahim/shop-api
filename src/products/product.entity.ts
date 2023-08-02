import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ProductStatus } from './enums/product-status.enum';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  desc: string;

  @Column()
  status: ProductStatus;

  @Column()
  featuredImg: string;

  @Column('simple-array')
  galleryImg: string[];
}
