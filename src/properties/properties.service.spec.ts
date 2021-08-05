import { getConnectionToken, SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { Sequelize } from 'sequelize';
import { Connection } from 'sequelize/types/lib/connection-manager';
import { CategoryType } from '../categories/entities/category-type.entity';
import { Category } from '../categories/entities/category.entity';
import { UserTypes } from '../enums/user-types.enum';
import { TestDatabaseConfig } from '../env';
import { Manager } from '../managers/entities/manager.entity';
import { City } from '../places/entities/city.entity';
import { Country } from '../places/entities/country.entity';
import { State } from '../places/entities/state.entity';
import { Address } from '../properties/entities/address.entity';
import { Property } from '../properties/entities/property.entity';
import { User } from '../users/entities/user.entity';
import { PropertiesService } from './properties.service';

describe('PropertiesService', () => {
  let service: PropertiesService;
  let connection: Sequelize;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRoot({
          dialect: 'mysql',
          host: TestDatabaseConfig.host,
          port: TestDatabaseConfig.port,
          username: TestDatabaseConfig.username,
          password: TestDatabaseConfig.password,
          database: TestDatabaseConfig.database,
          models: [
            User,
            Manager,
            Address,
            Property,
            City,
            State,
            Country,
            Category,
            CategoryType,
          ],
          autoLoadModels: false,
        }),
        SequelizeModule.forFeature([Property, Address, User]),
      ],
      providers: [PropertiesService],
    }).compile();

    service = await module.resolve<PropertiesService>(PropertiesService);
    connection = await module.get(getConnectionToken());

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return array of properties', async () => {
    const properties = await service.findAll();

    expect(properties.length).toBeGreaterThan(0);
  });

  it('should return array of properties filtered', async () => {
    const filters: any = {
      rooms: '1',
      price: '10, 50000',
    };

    const properties = await service.findAll(filters);

    expect(properties.length).toBeGreaterThan(0);
  });

  it('should create a property', async () => {
    const createProperty = {
      title: 'Title test',
      description: 'Description test',
      rooms: 1,
      area: 20.0,
      price: 5000.0,
      categoryId: 1,
      parkingSpaces: 1,
      bathrooms: 2,
      propertyTaxPrice: 100.0,
      condoPrice: 120.0,
      ownerId: 1,

      address: {
        street: 'Teste 1213',
        number: 1,
        complement: 'test complement',
        district: 'district',
        cityId: 1,
        stateId: 1,
        countryId: 1,
        zipCode: '88085200',
      },
    };

    const property = await service.create(createProperty);

    expect(property.id).toBeGreaterThan(0);
  });

  it('should update a property', async () => {
    service.currentUser = { id: 1, type: UserTypes.User, role: null };

    const properties = await service.findAllByOwner(1);

    const updateProperty = {
      title: 'title updated',
    };

    const property = await service.update(properties[0].id, updateProperty);

    expect(property.title).toEqual(updateProperty.title);
  });

  it('should remove a property', async () => {
    service.currentUser = { id: 1, type: UserTypes.User, role: null };

    const properties = await service.findAll();

    const response = await service.remove(properties[0].id);

    expect(response.delete).toBeTruthy();
  });

  afterEach(async () => {
    await connection.close();
    await module.close();
  });

  afterAll(async () => {
    await connection.close();
    await module.close();
  });
});
