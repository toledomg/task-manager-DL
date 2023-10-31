import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { UsersPrismaRepository } from './repositories/users.prisma.repository';
import { UsersRepository } from './repositories/users.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    JwtService,
    { provide: UsersRepository, useClass: UsersPrismaRepository },
  ],
  exports: [UsersService],
})
export class UsersModule {}
