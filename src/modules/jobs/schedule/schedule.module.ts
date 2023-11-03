import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from 'src/modules/tasks/tasks.service';
import { TaskPrismaRepository } from 'src/modules/tasks/repositories/tasks.prisma.repositoy';
import { TaskRepository } from 'src/modules/tasks/repositories/tasks.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ClientsModule.register([
      {
        name: 'NOTIFICATION',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['127.0.0.1:9092'],
          },
          consumer: {
            groupId: 'gp_app_task_manager',
          },
          producer: {
            allowAutoTopicCreation: true,
            retry: {
              maxRetryTime: 5000,
            },
          },
        },
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
