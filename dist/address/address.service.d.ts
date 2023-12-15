import { Address } from 'src/entity/Address';
import { User } from 'src/entity/User';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { CreateApiResponse, ApiGetResponse, ApiDeleteResponse } from 'src/common/interfaces';
export declare class AddressService {
    private addressRepository;
    constructor(addressRepository: Repository<Address>);
    getAddressById(user: User, addressId: string): Promise<Address>;
    createAddress(createAddressDto: CreateAddressDto, user: User): Promise<CreateApiResponse<Address>>;
    getAllAddress(user: User): Promise<ApiGetResponse<Address>>;
    updateAddress(user: User, updateAddressDto: Partial<CreateAddressDto>, id: string): Promise<CreateApiResponse<Address>>;
    deleteAddress(user: User, id: string): Promise<ApiDeleteResponse>;
}
