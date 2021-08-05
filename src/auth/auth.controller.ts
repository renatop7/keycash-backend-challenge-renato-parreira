import { BadRequestException, Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('Autenticação')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: LoginDto })
  @Post('login/admin')
  async adminLogin(@Body() credentials: LoginDto) {
    const user = await this.authService.validateManager(credentials);
    if (!user) {
      throw new BadRequestException('E-mail e/ou senha inválidos.');
    }
    return this.authService.login(user.id, user.type, user.role);
  }

  @ApiBody({ type: LoginDto })
  @Post('login')
  async userLogin(@Body() credentials: LoginDto) {
    const user = await this.authService.validateUser(credentials);
    if (!user) {
      throw new BadRequestException('E-mail e/ou senha inválidos.');
    }
    return this.authService.login(user.id, user.type, null);
  }
}
