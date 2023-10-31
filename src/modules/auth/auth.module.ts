import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { UsersRepository } from '../users/repositories/users.repository';
import { UsersPrismaRepository } from '../users/repositories/users.prisma.repository';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy, RefreshJwtStrategy } from './strategies';

@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({})],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RefreshJwtStrategy,
    PrismaService,
    {
      provide: UsersRepository,
      useClass: UsersPrismaRepository,
    },
  ],
  controllers: [AuthController],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
