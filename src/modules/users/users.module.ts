import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UploadUserStorage } from 'src/shared/storage/storage';
import { SupabaStorage } from 'src/shared/storage/supabase.storage';
import { UsersPrismaRepository } from './repositories/users.prisma.repository';
import { UsersRepository } from './repositories/users.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UploadAvatarUsersService } from './users.upload-avatar.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    UsersService,
    UploadAvatarUsersService,
    JwtService,
    { provide: UsersRepository, useClass: UsersPrismaRepository },
    { provide: UploadUserStorage, useClass: SupabaStorage },
  ],
  exports: [UsersService],
})
export class UsersModule {}
