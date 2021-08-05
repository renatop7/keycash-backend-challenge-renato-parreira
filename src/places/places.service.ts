import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { CityFilterDto } from './dto/city-filters.dto';
import { StateFilterDto } from './dto/state-filters.dto';
import { City } from './entities/city.entity';
import { Country } from './entities/country.entity';
import { State } from './entities/state.entity';

@Injectable()
export class PlacesService {
  constructor(
    @InjectModel(City) private cityModel: typeof City,
    @InjectModel(State) private stateModel: typeof State,
    @InjectModel(Country) private countryModel: typeof Country,
  ) {}

  async findAllCities(filters?: CityFilterDto) {
    const cityFilter = filters ? { [Op.or]: filters.state } : null;
    return await this.cityModel.findAll({
      where: cityFilter,
      include: {
        model: State,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
  }

  async findOneCity(id: number) {
    return await this.cityModel.findOne({
      where: { id: id },
      include: {
        model: State,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
  }

  async findAllStates(filters?: StateFilterDto) {
    const stateFilter = filters ? { [Op.or]: filters.country } : null;
    return await this.stateModel.findAll({
      where: stateFilter,
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
  }

  async findOneState(id: number) {
    return await this.stateModel.findOne({
      where: { id: id },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
  }

  async findAllCountries() {
    return await this.countryModel.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
  }

  async findOneCountry(id: number) {
    return await this.countryModel.findOne({
      where: { id: id },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
  }
}
