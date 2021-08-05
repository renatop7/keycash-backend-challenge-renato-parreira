import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

@Table
export class Country extends Model {
  @Column
  name: string;
}
