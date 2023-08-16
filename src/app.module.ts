import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/Product';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { TypeOrmConfig } from './utils/typeorm.config';
import { Categories } from './entity/Categories';
import { SubCategoriesModule } from './sub-categories/sub-categories.module';
import { SubCategory } from './entity/SubCategory';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Product, Categories, SubCategory]),
    TypeOrmConfig,
    ProductsModule,
    CategoriesModule,
    SubCategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
