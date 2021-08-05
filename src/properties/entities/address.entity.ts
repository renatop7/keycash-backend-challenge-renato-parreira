import { Exclude, Expose, Transform } from 'class-transformer';
import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { City } from '../../places/entities/city.entity';
import { Country } from '../../places/entities/country.entity';
import { State } from '../../places/entities/state.entity';
import { Property } from './property.entity';

@Table
export class Address extends Model {

  @Column
  street: string;

  @Column
  number: string;

  @Column
  complement: string;

  @Column
  district: string;

  @ForeignKey(() => City)
  @Column
  cityId: number;

  @BelongsTo(() => City)
  city: City;

  @ForeignKey(() => State)
  @Column
  stateId: number;

  @BelongsTo(() => State)
  state: State;

  @ForeignKey(() => Country)
  @Column
  countryId: number;

  @BelongsTo(() => Country)
  country: Country;

  @Column
  zipCode: string;

  @ForeignKey(() => Property)
  @Column
  @Exclude()
  propertyId: number;

  @BelongsTo(() => Property, 'propertyId')
  property: Property;
}
