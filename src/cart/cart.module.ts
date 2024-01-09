import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'src/entity/Cart.entity';
import { Product } from 'src/entity/Product.entity';
import { User } from 'src/entity/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, Product, User])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
