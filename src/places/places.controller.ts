import {
  Controller,
  DefaultValuePipe,
  Get,
  NotFoundException,
  Param,
  ParseArrayPipe,
  Query,
} from '@nestjs/common';
import { ApiPropertyOptional, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CityFilterDto } from './dto/city-filters.dto';
import { PlacesService } from './places.service';

@ApiTags('Localidades')
@Controller({ path: 'places', version: '1' })
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Get('cities')
  @ApiQuery({ name: 'state', required: false, description: 'Filtra cidades por estados. Ex: state=1 ou state=1,2,3 ' })
  findAllCities(
    @Query(
      'state',
      new DefaultValuePipe([]),
      new ParseArrayPipe({ items: Number, separator: ',' }),
    )
    statesToFilter?: number[],
  ) {
    const cityFilter =
      statesToFilter.length > 0 ? { state: statesToFilter } : null;

    console.log(cityFilter);
    return this.placesService.findAllCities(cityFilter);
  }

  @Get('cities/:id')
  async findCity(@Param('id') id: string) {
    const city = await this.placesService.findOneCity(+id);

    if (!city) throw new NotFoundException();

    return city;
  }

  @Get('states')
  findAllStates(
    @Query(
      'country',
      new DefaultValuePipe([]),
      new ParseArrayPipe({ items: Number, separator: ',' }),
    )
    countriesToFilter: number[],
  ) {
    const stateFilter =
      countriesToFilter.length > 0 ? { country: countriesToFilter } : null;

    return this.placesService.findAllStates(stateFilter);
  }

  @Get('states/:id')
  async findState(@Param('id') id: string) {
    const state = await this.placesService.findOneState(+id);

    if (!state) throw new NotFoundException();

    return state;
  }

  @Get('countries')
  findAllCountries() {
    return this.placesService.findAllCountries();
  }

  @Get('country/:id')
  async findCountry(@Param('id') id: string) {
    const country = await this.placesService.findOneCountry(+id);

    if (!country) throw new NotFoundException();

    return country;
  }
}
