import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { TypeOrmConfig } from './utils/typeorm.config';
import { SubCategoriesModule } from './sub-categories/sub-categories.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ShippingModule } from './address/address.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import { OrdersModule } from './orders/orders.module';
import { OrderItemsModule } from './order-items/order-items.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmConfig,
    ProductsModule,
    CategoriesModule,
    SubCategoriesModule,
    AuthModule,
    UsersModule,
    ShippingModule,
    WishlistsModule,
    OrdersModule,
    OrderItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
