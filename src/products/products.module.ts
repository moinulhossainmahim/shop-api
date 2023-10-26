import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entity/Product';
import { SubCategoriesModule } from 'src/sub-categories/sub-categories.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { Categories } from 'src/entity/Categories';
import { SubCategory } from 'src/entity/SubCategory';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Categories, SubCategory]),
    SubCategoriesModule,
    CategoriesModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
