import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from 'src/entity/User';
import { Address } from 'src/entity/Address';

@UseGuards(JwtAuthGuard)
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  async createAddress(
    @Body() createAddressDto: CreateAddressDto,
    @GetUser() user: User,
  ): Promise<Address> {
    return this.addressService.createAddress(createAddressDto, user);
  }

  @Get()
  async getAllAddress(@GetUser() user: User): Promise<Address[]> {
    return this.addressService.getAllAddress(user);
  }

  @Patch('/:id')
  async updateAddress(
    @GetUser() user: User,
    @Body() updateAddressDto: Partial<CreateAddressDto>,
    @Param('id') id: string,
  ): Promise<Address> {
    return this.addressService.updateAddress(user, updateAddressDto, id);
  }

  @Delete('/:id')
  async deleteAddress(
    @GetUser() user: User,
    @Param('id') id: string,
  ): Promise<void> {
    return this.addressService.deleteAddress(user, id);
  }
}
