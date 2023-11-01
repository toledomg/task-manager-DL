import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TaskRepository } from './repositories/tasks.repositoy';
import { TaskPrismaRepository } from './repositories/tasks.prisma.repositoy';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [],
  controllers: [TasksController],
  providers: [
    TasksService,
    PrismaService,
    JwtService,
    { provide: TaskRepository, useClass: TaskPrismaRepository },
  ],
  exports: [TasksService],
})
export class TasksModule {}
