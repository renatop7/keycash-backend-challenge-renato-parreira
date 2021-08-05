import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CategoryType } from './entities/category-type.entity';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category) private categoryModel: typeof Category,
    @InjectModel(CategoryType) private categoryTypeModel: typeof CategoryType,
  ) {}

  async findAllCategories() {
    return await this.categoryModel.findAll({
      include: {
        model: CategoryType,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
    });
  }

  async findAllCategoryTypes() {
    return await this.categoryTypeModel.findAll();
  }
}
