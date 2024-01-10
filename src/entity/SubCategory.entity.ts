import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Categories } from './Categories.entity';
import { Product } from './Product.entity';

@Entity()
export class SubCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column()
  slug: string;

  @ManyToOne(() => Categories, (category) => category.subCategories, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  category: Categories;

  @ManyToMany(() => Product, (product) => product.subcategories)
  products: Product[];
}
