import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { AddToCartDto } from './dto/addToCart-dto';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from 'src/entity/User';
import { ResponseInterceptor } from 'src/interceptors/response.interceptor';
import { CreateApiResponse } from 'src/common/interfaces';
import { Cart } from 'src/entity/Cart';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ResponseInterceptor)
  async addToCart(
    @Body() addToCartDto: AddToCartDto,
    @GetUser() user: User,
  ): Promise<CreateApiResponse<Omit<Cart, 'user'>>> {
    return await this.cartService.addToCart(addToCartDto, user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getCartOfAUser(@GetUser() user: User) {
    return this.cartService.getCartOfAUser(user);
  }

  @Put('/:productId')
  @UseGuards(JwtAuthGuard)
  async updateCart(
    @Param('productId') productId: string,
    @GetUser() user: User,
    @Query('quantity', ParseIntPipe) quantity: number,
  ) {
    return this.cartService.updateCart(user, productId, quantity);
  }

  @Delete('/all')
  @UseGuards(JwtAuthGuard)
  async deleteAllCartOfAUser(@GetUser() user: User) {
    return this.cartService.deleteAllCartOfAUser(user);
  }

  @Delete('/:productId')
  @UseGuards(JwtAuthGuard)
  async deleteCartByProductId(
    @Param('productId') productId: string,
    @GetUser() user: User,
  ) {
    return this.cartService.deleteCartByProductId(productId, user);
  }
}
