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
  ): Promise<Address> {
    const address = this.addressRepository.create({
      ...createAddressDto,
      user,
    });
    try {
      await this.addressRepository.save(address);
      delete address.user;
      return address;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllAddress(user: User): Promise<Address[]> {
    const query = this.addressRepository.createQueryBuilder('address');
    query.where('address.userId = :userId', { userId: user.id });
    const allAddress = await query.getMany();
    return allAddress;
  }

  async updateAddress(
    user: User,
    updateAddressDto: Partial<CreateAddressDto>,
    id: string,
  ): Promise<Address> {
    const address = await this.getAddressById(user, id);
    Object.assign(address, updateAddressDto);
    try {
      await this.addressRepository.save(address);
      return address;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAddress(user: User, id: string): Promise<void> {
    const address = await this.getAddressById(user, id);
    await this.addressRepository.delete(address.id);
  }
}
