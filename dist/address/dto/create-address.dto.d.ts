import { AddressType } from '../enums/address-type.enum';
export declare class CreateAddressDto {
    title: string;
    country: string;
    city: string;
    state: string;
    zip: string;
    streetAddress: string;
    addressType: AddressType;
}
