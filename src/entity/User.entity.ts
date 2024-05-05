import { UserStatus } from 'src/users/enums/user-status.enum';
import { Role } from 'src/users/enums/role.enum';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Address } from './Address.entity';
import { Wishlist } from './Wishlist.entity';
import { Order } from './Order.entity';
import { Cart } from './Cart.entity';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @Column({ default: false })
  isGoogleLogin: boolean;

  @Column({ default: '' })
  password?: string;

  @Column({ default: '' })
  avatar: string;

  @Column()
  email: string;

  @Column({ default: '' })
  contact?: string;

  @Column({ default: '' })
  salt?: string;

  @Column({ default: Role.Customer })
  userType: Role;

  @Column({ default: UserStatus.Active })
  status: UserStatus;

  @OneToMany(() => Address, (address) => address.user, {
    cascade: true,
  })
  address: Address[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.user)
  wishlist: Wishlist[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Cart, (cart) => cart.user)
  @JoinColumn()
  cart: Cart[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
