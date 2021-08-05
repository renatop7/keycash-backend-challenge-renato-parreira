
import { Sequelize } from 'sequelize-typescript';
import { Manager } from '../managers/entities/manager.entity';
import { Property } from '../properties/entities/property.entity';
import { User } from '../users/entities/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'desafio-keycash-test',
      });
      sequelize.addModels([User, Manager, Property]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
