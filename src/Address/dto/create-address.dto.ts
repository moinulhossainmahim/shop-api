import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { AddressType } from '../enums/address-type.enum';

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  zip: string;

  @IsString()
  @IsNotEmpty()
  streetAddress: string;

  @IsNotEmpty()
  @IsEnum(AddressType)
  addressType: AddressType;
}
