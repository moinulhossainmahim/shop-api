import { Injectable } from '@nestjs/common';
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
}
