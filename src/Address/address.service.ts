import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/entity/Address';
import { User } from 'src/entity/User';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { CreateApiResponse } from 'src/common/create-response.interface';
import { ApiGetResponse } from 'src/common/get-response.interface';
import { ApiDeleteResponse } from 'src/common/delete-response.interface';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  async getAddressById(user: User, addressId: string): Promise<Address> {
    const query = this.addressRepository.createQueryBuilder('address');
    const getAddressByUserId = await query
      .where('address.userId = :userId', {
        userId: user.id,
      })
      .getMany();
    if (!getAddressByUserId.length) {
      throw new BadRequestException(
        `This user is not eligible to do the operation`,
      );
    }
    const address = getAddressByUserId.find(
      (address) => address.id === addressId,
    );
    if (!address) {
      throw new NotFoundException(`Address with ID ${addressId} not found`);
    }
    return address;
  }

  async createAddress(
    createAddressDto: CreateAddressDto,
    user: User,
  ): Promise<CreateApiResponse<Address>> {
    const address = this.addressRepository.create({
      ...createAddressDto,
      user,
    });
    try {
      await this.addressRepository.save(address);
      delete address.user;
      return {
        message: 'Address added successfully',
        success: true,
        data: address,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async getAllAddress(user: User): Promise<ApiGetResponse<Address>> {
    const query = this.addressRepository.createQueryBuilder('address');
    query.where('address.userId = :userId', { userId: user.id });
    const allAddress = await query.getMany();
    return {
      message: 'Fetched addresses successfully',
      data: allAddress,
      success: true,
      meta: {},
    };
  }

  async updateAddress(
    user: User,
    updateAddressDto: Partial<CreateAddressDto>,
    id: string,
  ): Promise<CreateApiResponse<Address>> {
    const address = await this.getAddressById(user, id);
    Object.assign(address, updateAddressDto);
    try {
      await this.addressRepository.save(address);
      return {
        message: 'Address updated successfully',
        success: true,
        data: address,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAddress(user: User, id: string): Promise<ApiDeleteResponse> {
    const address = await this.getAddressById(user, id);
    const result = await this.addressRepository.delete(address.id);
    if (result.affected === 0) {
      throw new NotFoundException(`Category with ID ${id} is not found`);
    }
    return {
      success: true,
      data: [],
      message: 'Address deleted successfully',
    };
  }
}
