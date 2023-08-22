import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';
import { AddressType } from 'src/address/enums/address-type.enum';

@Entity()
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  zip: string;

  @Column()
  streetAddress: string;

  @Column()
  addressType: AddressType;

  @ManyToOne(() => User, (user) => user.address, { cascade: true })
  user: User;
}
