import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoryType } from './entities/category-type.entity';
import { Category } from './entities/category.entity';

@Module({
  imports: [SequelizeModule.forFeature([Category, CategoryType])],
  controllers: [CategoriesController],
  providers: [CategoriesService]
})
export class CategoriesModule {}
