import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  HasMany,
  BeforeCreate,
} from 'sequelize-typescript';
import { Property } from '../../properties/entities/property.entity';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';

@Table({ tableName: 'Users' })
export class User extends Model {
  @Column
  name: string;

  @Column
  email: string;

  @Column
  password: string;

  @CreatedAt
  createdAt: string;

  @UpdatedAt
  updatedAt: string;

  @HasMany(() => Property)
  properties: Property[];

  @BeforeCreate
  static async hashPassword(user: User) {
    try{
      user.password = await bcrypt.hash(user.password, 10);
    }catch(err){
      throw new InternalServerErrorException(err);
    }
  }
}
