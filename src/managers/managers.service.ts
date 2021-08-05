import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { Manager } from './entities/manager.entity';

@Injectable()
export class ManagersService {
  constructor(@InjectModel(Manager) private managerModel: typeof Manager) {}

  async create(createManagerDto: CreateManagerDto) {
    const createdUser = await this.managerModel.create(createManagerDto);
    return { id: createdUser.id };
  }

  async findAll() {
    return await this.managerModel.findAll({
      attributes: { exclude: ['password'] },
    });
  }

  async findOne(id: number) {
    return await this.managerModel.findOne({
      where: { id: id },
      attributes: { exclude: ['password'] },
    });
  }

  async findOneByEmail(email: string) {
    const user = await this.managerModel.findOne({
      where: { email: email },
    });

    return user;
  }

  async update(id: number, updateManagerDto: UpdateManagerDto) {
    const user = await this.findOne(id);

    if (!user) return false;

    return await user.update(updateManagerDto);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) return false;

    await user.destroy();
    return true;
  }
}

