import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseArrayPipe,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';

@ApiTags('Categorias de imóveis')
@Controller({ path: 'categories', version: '1'})
export class CategoriesController {

  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAllCategories() {
    return this.categoriesService.findAllCategories();
  }

  @Get('types')
  findAllCategoryTypes(){
      return this.categoriesService.findAllCategoryTypes();
  }
}
