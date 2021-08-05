import { Module } from '@nestjs/common';
import { ManagersService } from './managers.service';
import { ManagersController } from './managers.controller';
import { Manager } from './entities/manager.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Manager])],
  controllers: [ManagersController],
  providers: [ManagersService],
  exports: [ManagersService]
})
export class ManagersModule {}
