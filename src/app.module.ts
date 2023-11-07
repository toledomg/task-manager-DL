import { Module } from '@nestjs/common';
import { PrismaModule } from './config/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { ScheduleTaskModule } from './modules/jobs/schedule/schedule.module';
import { ProductModule } from './modules/product/product.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    TasksModule,
    ScheduleTaskModule,
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
