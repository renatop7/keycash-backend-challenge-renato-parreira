import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ManagersModule } from '../managers/managers.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { authConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { TestStrategy } from './strategies/test.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: authConstants.jwtSecret,
      signOptions: { expiresIn: '7d' },
    }),
    ManagersModule,
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    LocalStrategy,
    JwtStrategy,
    AuthService,
    TestStrategy
  ],
  exports: [
    AuthService,
  ]
})
export class AuthModule {}
