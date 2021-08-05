import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  BelongsTo,
  ForeignKey,
  HasOne,
} from 'sequelize-typescript';
import { Category } from '../../categories/entities/category.entity';
import { User } from '../../users/entities/user.entity';
import { Address } from './address.entity';

@Table
export class Property extends Model {
  @Column
  title: string;

  @Column
  description: string;

  @Column
  rooms: number;

  @Column
  area: number;

  @Column
  categoryId: number;

  @BelongsTo(() => Category, 'categoryId')
  category: Category

  @Column
  parkingSpaces: number;

  @Column
  bathrooms: number;

  @Column
  price: number;

  @Column
  propertyTaxPrice: number;

  @Column
  condoPrice: number;

  @ForeignKey(() => User)
  @Column
  ownerId: number;

  @BelongsTo(() => User)
  owner: User;

  @HasOne(() => Address)
  address: Address

  @CreatedAt
  createdAt: string;

  @UpdatedAt
  updatedAt: string;
}
