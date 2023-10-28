import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { User } from 'src/entity/User';
import { Address } from 'src/entity/Address';
import { CreateApiResponse } from 'src/common/create-response.interface';
import { ApiGetResponse } from 'src/common/get-response.interface';
import { ApiDeleteResponse } from 'src/common/delete-response.interface';
export declare class AddressController {
    private readonly addressService;
    constructor(addressService: AddressService);
    createAddress(createAddressDto: CreateAddressDto, user: User): Promise<CreateApiResponse<Address>>;
    getAllAddress(user: User): Promise<ApiGetResponse<Address>>;
    updateAddress(user: User, updateAddressDto: Partial<CreateAddressDto>, id: string): Promise<CreateApiResponse<Address>>;
    deleteAddress(user: User, id: string): Promise<ApiDeleteResponse>;
}
