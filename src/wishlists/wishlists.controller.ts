import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from 'src/entity/User';
import { Wishlist } from 'src/entity/Wishlist';

@UseGuards(JwtAuthGuard)
@Controller('wishlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Post('/:id')
  async addToWishlist(@GetUser() user: User, @Param('id') id: string) {
    this.wishlistsService.addToWishlist(user, id);
  }

  @Get()
  async getWishlist(@GetUser() user: User): Promise<Wishlist[]> {
    return this.wishlistsService.getWishlist(user);
  }

  @Delete('/:id')
  async removeFromWishlist(@Param('id') id: string): Promise<void> {
    return this.wishlistsService.removeFromWishlist(id);
  }
}
