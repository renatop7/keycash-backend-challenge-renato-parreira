import { Module } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { PropertiesController } from './properties.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Property } from './entities/property.entity';
import { User } from '../users/entities/user.entity';
import { Address } from './entities/address.entity';

@Module({
  imports: [SequelizeModule.forFeature([Property, User, Address])],
  controllers: [PropertiesController],
  providers: [PropertiesService],
})
export class PropertiesModule {}
