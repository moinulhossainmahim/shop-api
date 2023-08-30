import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SubCategory } from './SubCategory';

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

  @OneToMany(() => SubCategory, (subCategory) => subCategory.category)
  subCategories: SubCategory[];
}
