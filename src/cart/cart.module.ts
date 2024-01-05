import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'src/entity/Cart';
import { Product } from 'src/entity/Product';
import { User } from 'src/entity/User';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, Product, User])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
