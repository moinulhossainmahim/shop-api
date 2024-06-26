import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SubCategory } from './SubCategory.entity';
import { Product } from './Product.entity';

@Entity()
export class Categories {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  slug: string;

  @Column()
  description: string;

  @Column()
  icon: string;

  @OneToMany(() => SubCategory, (subCategory) => subCategory.category, {
    cascade: true,
  })
  subCategories: SubCategory[];

  @ManyToMany(() => Product, (product) => product.categories)
  products: Product[];
}
