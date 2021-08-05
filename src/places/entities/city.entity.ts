import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { State } from './state.entity';

@Table
export class City extends Model {
  @Column
  name: string;

  @ForeignKey(() => State)
  @Column
  stateId: number;

  @BelongsTo(() => State, 'stateId')
  state: State;
}
