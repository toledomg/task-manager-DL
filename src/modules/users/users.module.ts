import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { UsersPrismaRepository } from './repositories/users.prisma.repository';
import { UsersRepository } from './repositories/users.repository';
import { JwtService } from '@nestjs/jwt';
import { UploadAvatarUsersService } from './users.upload-avatar.service';
import { UploadUserStorage } from 'src/shared/storage/storage';
import { SupabaStorage } from 'src/shared/storage/supabase.storage';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    UploadAvatarUsersService,
    JwtService,
    { provide: UsersRepository, useClass: UsersPrismaRepository },
    { provide: UploadUserStorage, useClass: SupabaStorage },
  ],
  exports: [UsersService],
})
export class UsersModule {}
