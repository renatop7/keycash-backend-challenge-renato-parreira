import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Country } from './country.entity';

@Table
export class State extends Model {
  @Column
  name: string;

  @Column
  uf: string;

  @ForeignKey(() => Country)
  @Column
  countryId: number;

  @BelongsTo(() => Country, 'countryId')
  country: Country;
}
