import { UserStatus } from 'src/users/enums/user-status.enum';
import { Role } from 'src/users/enums/role.enum';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Address } from './Address';
import { Wishlist } from './Wishlist';

@Entity()
@Unique(['email'])
export class User {
  @Column()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @Column()
  password: string;

  @Column({ default: '' })
  avatar: string;

  @Column()
  email: string;

  @Column()
  salt: string;

  @Column({ default: Role.Customer })
  userType: Role;

  @Column({ default: UserStatus.Active })
  status: UserStatus;

  @OneToMany(() => Address, (address) => address.user, {
    onDelete: 'SET NULL',
    eager: true,
  })
  address: Address[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.user)
  wishlist: Wishlist[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
