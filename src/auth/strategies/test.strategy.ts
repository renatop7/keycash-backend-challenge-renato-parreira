
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Strategy } from 'passport-local';

@Injectable()
export class TestStrategy extends PassportStrategy(Strategy, 'test') {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(username: string, password: string): Promise<any> {
    // const user = await this.authService.validateManager({ email: username, password: password });
    // if (!user) {
    //   throw new BadRequestException('E-mail e/ou senha inválidos.');
    // }
    // return user;

    return { id: 1 };
  }
}