import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Categories } from './Categories';
import { Product } from './Product';

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
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'categoryID' })
  category: Categories;

  @ManyToMany(() => Product, (product) => product.subcategories)
  products: Product[];
}
