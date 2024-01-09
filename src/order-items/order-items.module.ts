import { Module } from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from 'src/entity/OrderItem.entity';
import { ProductsModule } from 'src/products/products.module';
import { Product } from 'src/entity/Product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem, Product]), ProductsModule],
  providers: [OrderItemsService],
  exports: [OrderItemsService],
})
export class OrderItemsModule {}
