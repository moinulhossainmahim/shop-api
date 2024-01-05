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
} from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { AddToCartDto } from './dto/addToCart-dto';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from 'src/entity/User';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async addToCart(@Body() addToCartDto: AddToCartDto, @GetUser() user: User) {
    return await this.cartService.addToCart(addToCartDto, user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getCartOfAUser(@GetUser() user: User) {
    return this.cartService.getCartOfAUser(user);
  }

  @Get('/all')
  @UseGuards(JwtAuthGuard)
  async getAllCarts() {
    return this.cartService.getAllCarts();
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  async updateCart(
    @Param('id') id: string,
    @GetUser() user: User,
    @Query('quantity', ParseIntPipe) quantity: number,
  ) {
    return this.cartService.updateCart(user, id, quantity);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async deleteCartById(@Param('id') id: string, @GetUser() user: User) {
    return this.cartService.deleteCartById(id, user);
  }
}
