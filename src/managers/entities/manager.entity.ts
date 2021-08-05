import { InternalServerErrorException } from '@nestjs/common';
import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  BeforeCreate,
} from 'sequelize-typescript';

import * as bcrypt from 'bcrypt';

@Table
export class Manager extends Model {
  @Column
  name: string;

  @Column
  email: string;

  @Column
  password: string;
  
  @Column
  role: number;

  @CreatedAt
  createdAt: string;

  @UpdatedAt
  updatedAt: string;
  
  
  @BeforeCreate
  static async hashPassword(manager: Manager) {
    try{
      manager.password = await bcrypt.hash(manager.password, 10);
    }catch(err){
      throw new InternalServerErrorException(err);
    }
  }
}
