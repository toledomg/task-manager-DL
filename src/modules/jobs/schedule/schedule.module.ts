import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from 'src/modules/tasks/tasks.service';
import { TaskPrismaRepository } from 'src/modules/tasks/repositories/tasks.prisma.repositoy';
import { TaskRepository } from 'src/modules/tasks/repositories/tasks.repositoy';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ClientsModule.register([
      {
        name: 'NOTIFICATION',
        transport: Transport.TCP,
        options: { port: 3156, host: '127.0.0.1' },
      },
    ]),
  ],
  providers: [
    ScheduleService,
    TasksService,
    { provide: TaskRepository, useClass: TaskPrismaRepository },
  ],
})
export class ScheduleTaskModule {}
