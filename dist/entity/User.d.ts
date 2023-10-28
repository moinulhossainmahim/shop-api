import { UserStatus } from 'src/users/enums/user-status.enum';
import { Role } from 'src/users/enums/role.enum';
import { Address } from './Address';
import { Wishlist } from './Wishlist';
import { Order } from './Order';
export declare class User {
    id: string;
    fullName: string;
    password: string;
    avatar: string;
    email: string;
    contact: string;
    salt: string;
    userType: Role;
    status: UserStatus;
    address: Address[];
    wishlist: Wishlist[];
    orders: Order[];
    validatePassword(password: string): Promise<boolean>;
}
