import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entity/Product';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), ProductsModule],
  providers: [StripeService],
  exports: [StripeService],
})
export class StripeModule {}
