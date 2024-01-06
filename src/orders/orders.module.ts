import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entity/Order';
import { OrderItemsModule } from 'src/order-items/order-items.module';
import { StripeModule } from 'src/stripe/stripe.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), OrderItemsModule, StripeModule],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
