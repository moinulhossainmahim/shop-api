import { Module } from '@nestjs/common';
import { WishlistsController } from './wishlists.controller';
import { WishlistsService } from './wishlists.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wishlist } from 'src/entity/Wishlist';
import { Product } from 'src/entity/Product';

@Module({
  imports: [TypeOrmModule.forFeature([Wishlist, Product])],
  controllers: [WishlistsController],
  providers: [WishlistsService],
})
export class WishlistsModule {}
