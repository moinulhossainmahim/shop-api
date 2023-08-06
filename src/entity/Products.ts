import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Products {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;
}
