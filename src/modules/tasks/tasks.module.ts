import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TaskPrismaRepository } from './repositories/tasks.prisma.repositoy';
import { TaskRepository } from './repositories/tasks.repository';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [],
  controllers: [TasksController],
  providers: [
    TasksService,
    JwtService,
    { provide: TaskRepository, useClass: TaskPrismaRepository },
  ],
  exports: [TasksService],
})
export class TasksModule {}
