import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Categories } from './Categories';

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
    cascade: true,
  })
  @JoinColumn({ name: 'categoryID' })
  category: Categories;
}