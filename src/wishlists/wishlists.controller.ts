import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from 'src/entity/User';
import { Wishlist } from 'src/entity/Wishlist';
import { ResponseInterceptor } from 'src/interceptors/response.interceptor';
import { CreateApiResponse } from 'src/common/create-response.interface';
import { ApiGetResponse } from 'src/common/get-response.interface';

@UseGuards(JwtAuthGuard)
@UseInterceptors(ResponseInterceptor)
@Controller('wishlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Post('/:id')
  async addToWishlist(
    @GetUser() user: User,
    @Param('id') id: string,
  ): Promise<CreateApiResponse<any>> {
    return this.wishlistsService.addToWishlist(user, id);
  }

  @Get()
  async getWishlist(@GetUser() user: User): Promise<ApiGetResponse<Wishlist>> {
    return this.wishlistsService.getAllWishlist(user);
  }

  @Delete('/:id')
  async removeFromWishlist(
    @Param('id') id: string,
  ): Promise<CreateApiResponse<any>> {
    return this.wishlistsService.removeFromWishlist(id);
  }
}
