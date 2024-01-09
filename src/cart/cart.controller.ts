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
import { AddToCartDto } from './dto/addToCart.dto';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from 'src/entity/User.entity';
import { ResponseInterceptor } from 'src/interceptors/response.interceptor';
import {
  ApiDeleteResponse,
  ApiGetResponse,
  CreateApiResponse,
} from 'src/common/interfaces';
import { Cart } from 'src/entity/Cart.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('cart')
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
  @UseInterceptors(ResponseInterceptor)
  async getCartOfAUser(@GetUser() user: User): Promise<ApiGetResponse<Cart>> {
    return this.cartService.getCartOfAUser(user);
  }

  @Put('/:productId')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ResponseInterceptor)
  async updateCart(
    @Param('productId') productId: string,
    @GetUser() user: User,
    @Query('quantity', ParseIntPipe) quantity: number,
  ): Promise<CreateApiResponse<Cart>> {
    return this.cartService.updateCart(user, productId, quantity);
  }

  @Delete('/all')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ResponseInterceptor)
  async deleteAllCartOfAUser(
    @GetUser() user: User,
  ): Promise<ApiDeleteResponse> {
    return this.cartService.deleteAllCartOfAUser(user);
  }

  @Delete('/:productId')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ResponseInterceptor)
  async deleteCartByProductId(
    @Param('productId') productId: string,
    @GetUser() user: User,
  ): Promise<ApiDeleteResponse> {
    return this.cartService.deleteCartByProductId(productId, user);
  }
}
