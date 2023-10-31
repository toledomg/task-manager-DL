import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [ConfigModule.forRoot({}), UsersModule, AuthModule, JwtModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
