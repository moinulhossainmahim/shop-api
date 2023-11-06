import { User } from './User';
import { AddressType } from 'src/address/enums/address-type.enum';
export declare class Address {
    id: string;
    title: string;
    country: string;
    city: string;
    state: string;
    zip: string;
    streetAddress: string;
    addressType: AddressType;
    isActive: boolean;
    user: User;
}
