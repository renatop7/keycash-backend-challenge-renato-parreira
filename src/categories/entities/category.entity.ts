import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { CategoryType } from './category-type.entity';

@Table
export class Category extends Model {
  @Column
  name: string;

  @ForeignKey(() => CategoryType)
  @Column
  typeId: number;

  @BelongsTo(() => CategoryType, 'typeId')
  type: CategoryType;
}
