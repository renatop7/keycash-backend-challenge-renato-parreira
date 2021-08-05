import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Request } from 'express';
import { UserAuth } from '../auth/entities/user-auth.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const createdUser = await this.userModel.create(createUserDto);
    return { id: createdUser.id };
  }

  async findAll() {
    return await this.userModel.findAll({
      attributes: { exclude: ['password'] },
    });
  }

  async findOne(id: number) {
    return await this.userModel.findOne({
      where: { id: id },
      attributes: { exclude: ['password'] },
    });
  }

  async findOneByEmail(email: string) {
    const user = await this.userModel.findOne({
      where: { email: email },
    });

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const loggedUser = <UserAuth>this.request.user;
    if (!loggedUser.role && loggedUser.id !== id)
      throw new UnauthorizedException();

    const user = await this.userModel.findOne({
      where: { id: id },
      attributes: { exclude: ['password'] },
    });
    if (!user) throw new BadRequestException('Usuário não encontrado');

    return await user.update(updateUserDto);
  }

  async remove(id: number) {
    const loggedUser = <UserAuth>this.request.user;
    if (!loggedUser.role && loggedUser.id !== id)
      throw new UnauthorizedException();

    const user = await this.userModel.findOne({ where: { id: id } });
    if (!user) throw new BadRequestException('Usuário não encontrado');

    await user.destroy();
    return { delete: true };
  }
}
