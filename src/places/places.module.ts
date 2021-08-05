import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { City } from './entities/city.entity';
import { Country } from './entities/country.entity';
import { State } from './entities/state.entity';
import { PlacesController } from './places.controller';
import { PlacesService } from './places.service';

@Module({
  imports: [SequelizeModule.forFeature([City, State, Country])],
  controllers: [PlacesController],
  providers: [PlacesService]
})
export class PlacesModule {}
