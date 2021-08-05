import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Property } from './entities/property.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { PropertyFiltersDto } from './dto/filters.dto';
import { PropertyFilters } from '../enums/property-filters.enum';
import { Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Scope } from '@nestjs/common';
import { Request } from 'express';
import { UserAuth } from '../auth/entities/user-auth.entity';
import { Address } from './entities/address.entity';
import { City } from '../places/entities/city.entity';
import { Country } from '../places/entities/country.entity';
import { State } from '../places/entities/state.entity';
import { Category } from '../categories/entities/category.entity';
import { CategoryType } from '../categories/entities/category-type.entity';
import { UpdateAddressDto } from './dto/update-address.dto';
import { User } from '../users/entities/user.entity';

@Injectable({ scope: Scope.REQUEST })
export class PropertiesService {


  private _currentUser: UserAuth;
  public get currentUser(): UserAuth {
    return this._currentUser;
  }
  public set currentUser(value: UserAuth) {
    this._currentUser = value;
  }

  constructor(
    @InjectModel(Property) private propertyModel: typeof Property,
    @InjectModel(Address) private addressModel: typeof Address,
    @Inject(REQUEST) private readonly request: Request,
  ) {

    this.currentUser = this.request?.user as UserAuth;
  }

  // Inserção de um novo imóvel.
  // A validação dos dados é feita pelo ValidationPipe no PropertiesController
  // As instruções da validação é encontrada no CreatePropertyDto

  async create(createPropertyDto: CreatePropertyDto) {
    const property = await this.propertyModel.create(createPropertyDto);

    if (!property)
      throw new BadRequestException('Não foi possível criar o imóvel');

    createPropertyDto.address.propertyId = property.id;
    const address = await this.addressModel.create(createPropertyDto.address);

    if (!address)
      throw new BadRequestException('Não foi possível criar o endereço');

    return { id: property.id };
  }

  // Consulta geral de imóveis, caso haja filtros

  async findAll(filters?: PropertyFiltersDto) {
    const selectedFilters = filters ? this.buildFiltersObject(filters) : null;

    const propertyList = await this.propertyModel.findAll({
      include: [
        {
          model: Category,
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
          include: [
            {
              model: CategoryType,
              attributes: {
                exclude: ['createdAt', 'updatedAt'],
              },
            },
          ],
          where: selectedFilters?.categoriesFilters,
        },
        {
          model: User,
          attributes: {
            exclude: ['password', 'createdAt', 'updatedAt'],
          },
        },
        {
          model: Address,
          include: [
            {
              model: City,
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'stateId'],
              },
            },
            {
              model: State,
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'countryId'],
              },
            },
            {
              model: Country,
              attributes: {
                exclude: ['createdAt', 'updatedAt'],
              },
            },
          ],
          where: selectedFilters?.placesFilters,
        },
      ],
      where: selectedFilters?.propertyFilters,
      order: [['createdAt', 'desc']],
    });

    return propertyList;
  }

  // Consulta de imóvel por id

  async findOne(id: number) {
    return await this.propertyModel.findOne({
      include: [
        {
          model: Category,
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
          include: [
            {
              model: CategoryType,
              attributes: {
                exclude: ['createdAt', 'updatedAt'],
              },
            },
          ],
        },
        {
          model: User,
          attributes: {
            exclude: ['password', 'createdAt', 'updatedAt'],
          },
        },
        {
          model: Address,
          include: [
            {
              model: City,
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'stateId'],
              },
            },
            {
              model: State,
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'countryId'],
              },
            },
            {
              model: Country,
              attributes: {
                exclude: ['createdAt', 'updatedAt'],
              },
            },
          ],
        },
      ],
      where: { id: id },
    });
  }

  // Listagem de todos os imóveis de um usuário específico

  async findAllByOwner(ownerId: number) {
    return await this.propertyModel.findAll({
      include: [
        {
          model: Category,
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
          include: [
            {
              model: CategoryType,
              attributes: {
                exclude: ['createdAt', 'updatedAt'],
              },
            },
          ],
        },
        {
          model: Address,
          include: [
            {
              model: City,
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'stateId'],
              },
            },
            {
              model: State,
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'countryId'],
              },
            },
            {
              model: Country,
              attributes: {
                exclude: ['createdAt', 'updatedAt'],
              },
            },
          ],
        },
      ],
      where: { ownerId: ownerId },
      order: [['createdAt', 'desc']],
    });
  }

  // A validação dos dados é feita pelo ValidationPipe no PropertiesController
  // As instruções da validação é encontrada no UpdatePropertyDto
  // Somente o dono do imóvel ou um administrador pode atualizar os dados do imóvel

  async update(id: number, updatePropertyDto: UpdatePropertyDto) {
    

    const property = await this.propertyModel.findOne({ where: { id: id } });

    if (!property) throw new BadRequestException('Imóvel não encontrado.');

    if (!this.currentUser.role && this.currentUser.id !== property.ownerId)
      throw new UnauthorizedException(
        'Você não tem permissão para alterar este imóvel.',
      );

    const updateResponse = await property.update(updatePropertyDto);
    return updateResponse;
  }

  // Somente o dono do imóvel ou um administrador pode remover o imóvel

  async remove(id: number) {
    

    const property = await this.propertyModel.findOne({ where: { id: id } });

    if (!property) throw new BadRequestException('Imóvel não encontrado.');

    if (!this.currentUser.role && this.currentUser.id !== property.ownerId)
      throw new UnauthorizedException(
        'Você não tem permissão para remover este imóvel.',
      );

    await property.destroy();

    return { delete: true };
  }

  async updatePropertyAddress(id: number, updateAddressDto: UpdateAddressDto) {
    

    const property = await this.propertyModel.findOne({
      where: { id: id },
      include: { model: Address },
    });

    if (!property) throw new BadRequestException('Imóvel não encontrado.');

    if (!this.currentUser.role && this.currentUser.id !== property.ownerId)
      throw new UnauthorizedException(
        'Você não tem permissão para alterar este imóvel.',
      );

    if (!property.address) {
      updateAddressDto.propertyId = property.id;
      return await this.addressModel.create(updateAddressDto);
    }

    const updateResponse = await property.address.update(updateAddressDto);
    return updateResponse;
  }

  // Construção do objeto para filtragem dos dados no banco.
  // Cada 'query key' aceita é acessada do enum PropertyFilters (enums/property-filters.enum.ts)
  // Para caso específico é utilizado um tipo de construtor de filtro

  private buildFiltersObject(filters: PropertyFiltersDto) {
    const propertyFilters: any = {};
    const places: any[] = [];
    const categories: any[] = [];
    const types: any[] = [];

    for (let key in filters) {
      switch (key) {
        case PropertyFilters.Rooms:
          propertyFilters[key] = this.buildInRangeFilter(key, filters[key]);
          break;
        case PropertyFilters.Area:
          propertyFilters[key] = this.buildInRangeFilter(key, filters[key]);
          break;
        case PropertyFilters.Price:
          propertyFilters[key] = this.buildInRangeFilter(key, filters[key]);
          break;
        case PropertyFilters.Type:
          const typeIds = {
            typeId: this.buildEqualToArrayFilter(key, filters[key]),
          };
          types.push(typeIds);
          break;
        case PropertyFilters.Categories:
          const categoryIds = {
            id: this.buildEqualToArrayFilter(key, filters[key]),
          };
          categories.push(categoryIds);
          break;
        case PropertyFilters.ParkingSpaces:
          propertyFilters[key] = this.buildInRangeFilter(key, filters[key]);
          break;
        case PropertyFilters.State:
          const stateIds = {
            stateId: this.buildEqualToArrayFilter(key, filters[key]),
          };
          places.push(stateIds);
          break;
        case PropertyFilters.City:
          const cityIds = {
            cityId: this.buildEqualToArrayFilter(key, filters[key]),
          };
          places.push(cityIds);
          break;
      }
    }

    const queryFilters = {
      propertyFilters: propertyFilters,
      placesFilters: places.length ? { [Op.or]: places } : null,
      categoriesFilters:
        categories.length || types.length
          ? { [Op.or]: [...categories, ...types] }
          : null,
    };

    return queryFilters;
  }

  // Filtro utilizado para parâmetros que trabalham em um range de valores.
  // Em caso de valor único busca-se a igualdade.

  private buildInRangeFilter(filterName: string, valuesToFilter: string) {
    const values = valuesToFilter
      .split(',')
      .map((value: string) => {
        if (isNaN(+value)) return this.invalidFilterException(filterName);
        return +value;
      })
      .slice(0, 2)
      .sort((a: number, b: number) => a - b);

    if (values.length > 1) {
      return {
        [Op.gte]: values[0],
        [Op.lte]: values[1],
      };
    } else {
      return {
        [Op.eq]: values[0],
      };
    }
  }

  // Filtro utilizado para parâmetros que aceitam apenas um valor
  private buildEqualToFilter(
    filterName: string,
    valueToFilter: string,
    appendOperator: boolean = false,
  ) {
    const value = +valueToFilter;

    if (isNaN(value)) return this.invalidFilterException(filterName);

    return appendOperator ? { [Op.eq]: value } : value;
  }

  // Filtro utilizado para parâmetros que aceitam um array de valores
  private buildEqualToArrayFilter(
    filterName: string,
    valuesToFilter: string,
    appendOperator: boolean = false,
  ) {
    const values = valuesToFilter.split(',').map((value: string) => {
      if (isNaN(+value)) {
        this.invalidFilterException(filterName);
        return null;
      } else {
        return +value;
      }
    });

    return appendOperator ? { [Op.or]: values } : values;
  }

  // Exceção emitida em caso de valores inesperados em algum parâmetro de filtro.
  private invalidFilterException(filterName: string) {
    throw new BadRequestException(`Valor do filtro '${filterName}' inválido.`);
  }
}
