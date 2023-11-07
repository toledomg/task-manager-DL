import { Module } from '@nestjs/common';
import { UploadUserStorage } from 'src/shared/storage/storage';
import { SupabaStorage } from 'src/shared/storage/supabase.storage';
import { UsersPrismaRepository } from './repositories/users.prisma.repository';
import { UsersRepository } from './repositories/users.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UploadAvatarUsersService } from './users.upload-avatar.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  controllers: [UsersController],
  providers: [
    UsersService,
    UploadAvatarUsersService,
    { provide: UsersRepository, useClass: UsersPrismaRepository },
    { provide: UploadUserStorage, useClass: SupabaStorage },
  ],
  exports: [UsersService],
})
export class UsersModule {}
