import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  @Column()
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  slug: string;

  @Column()
  icon: string;
}
