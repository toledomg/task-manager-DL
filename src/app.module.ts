import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [ConfigModule.forRoot({}), UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
