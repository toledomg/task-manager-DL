import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { TasksModule } from './modules/tasks/tasks.module';

@Module({
  imports: [ConfigModule.forRoot({}), UsersModule, AuthModule, JwtModule, TasksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
