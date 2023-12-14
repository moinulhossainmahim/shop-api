import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from 'src/entity/User';
import { Address } from 'src/entity/Address';
import { ResponseInterceptor } from 'src/interceptors/response.interceptor';
import {
  CreateApiResponse,
  ApiGetResponse,
  ApiDeleteResponse,
} from 'src/common/interfaces';

@UseGuards(JwtAuthGuard)
@UseInterceptors(ResponseInterceptor)
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  async createAddress(
    @Body() createAddressDto: CreateAddressDto,
    @GetUser() user: User,
  ): Promise<CreateApiResponse<Address>> {
    return this.addressService.createAddress(createAddressDto, user);
  }

  @Get()
  async getAllAddress(@GetUser() user: User): Promise<ApiGetResponse<Address>> {
    return this.addressService.getAllAddress(user);
  }

  @Patch('/:id')
  async updateAddress(
    @GetUser() user: User,
    @Body() updateAddressDto: Partial<CreateAddressDto>,
    @Param('id') id: string,
  ): Promise<CreateApiResponse<Address>> {
    return this.addressService.updateAddress(user, updateAddressDto, id);
  }

  @Delete('/:id')
  async deleteAddress(
    @GetUser() user: User,
    @Param('id') id: string,
  ): Promise<ApiDeleteResponse> {
    return this.addressService.deleteAddress(user, id);
  }
}
