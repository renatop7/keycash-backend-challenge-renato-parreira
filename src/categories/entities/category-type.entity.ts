import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { Category } from './category.entity';

@Table
export class CategoryType extends Model {
  @Column
  name: string;

  @HasMany(() => Category, 'typeId')
  categories: Category[];
}
