import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Manager } from '../managers/entities/manager.entity';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { UserTypes } from '../enums/user-types.enum';
import { ManagersService } from '../managers/managers.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private managerService: ManagersService,
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateManager(credentials: LoginDto) {
    const manager = await this.managerService.findOneByEmail(credentials.email);

    if (!manager) throw new BadRequestException('Usuário não encontrado');

    const passwordCheck = await bcrypt.compare(
      credentials.password,
      manager.password,
    );

    if (!passwordCheck) return false;

    return { id: manager.id, type: UserTypes.Manager, role: manager.role };
  }

  async validateUser(credentials: LoginDto) {
    const user = await this.userService.findOneByEmail(credentials.email);

    if (!user) throw new BadRequestException('Usuário não encontrado');

    const passwordCheck = await bcrypt.compare(
      credentials.password,
      user.password,
    );
    if (!passwordCheck) return false;
    
    return { id: user.id, type: UserTypes.User };
  }

  async login(id: number, type: string, role?: number) {
    const payload = {
      id: id,
      type: type,
      role: role ? role : null,
    };

    return { access_token: this.jwtService.sign(payload) };
  }
}
