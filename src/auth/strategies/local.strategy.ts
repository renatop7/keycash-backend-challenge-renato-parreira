
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(username: string, password: string): Promise<any> {
    // const user = await this.authService.validateManager({ email: username, password: password });
    // if (!user) {
    //   throw new BadRequestException('E-mail e/ou senha inválidos.');
    // }
    // return user;

    return { id: 1 }
  }
}