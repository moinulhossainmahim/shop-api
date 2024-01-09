import { Module } from '@nestjs/common';
import { SubCategoriesController } from './sub-categories.controller';
import { SubCategoriesService } from './sub-categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubCategory } from 'src/entity/SubCategory.entity';
import { Categories } from 'src/entity/Categories.entity';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubCategory, Categories]),
    CategoriesModule,
  ],
  controllers: [SubCategoriesController],
  providers: [SubCategoriesService],
  exports: [SubCategoriesService],
})
export class SubCategoriesModule {}
