import { Module } from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from 'src/entity/OrderItem';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem])],
  providers: [OrderItemsService],
  exports: [OrderItemsService],
})
export class OrderItemsModule {}
