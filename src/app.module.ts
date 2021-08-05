import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { Property } from './properties/entities/property.entity';
import { PropertiesModule } from './properties/properties.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ManagersModule } from './managers/managers.module';
import { User } from './users/entities/user.entity';
import { Manager } from './managers/entities/manager.entity';
import { PlacesModule } from './places/places.module';
import { City } from './places/entities/city.entity';
import { Country } from './places/entities/country.entity';
import { State } from './places/entities/state.entity';
import { Address } from './properties/entities/address.entity';
import { CategoriesModule } from './categories/categories.module';
import { CategoryType } from './categories/entities/category-type.entity';
import { Category } from './categories/entities/category.entity';
import { DatabaseConfig } from './env';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: DatabaseConfig.host,
      port: DatabaseConfig.port,
      username: DatabaseConfig.username,
      password: DatabaseConfig.password,
      database: DatabaseConfig.database,
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
    AuthModule,
    PropertiesModule,
    UsersModule,
    ManagersModule,
    PlacesModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
