import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Cron, CronExpression } from '@nestjs/schedule';
import { NotificationMessageDto } from 'src/modules/tasks/dto/create-task.dto';
import { TaskRepository } from 'src/modules/tasks/repositories/tasks.repository';

@Injectable()
export class ScheduleService {
  constructor(
    private taskRepository: TaskRepository,
    @Inject('NOTIFICATION') private readonly notificationClient: ClientKafka,
  ) {}
  @Cron(CronExpression.EVERY_DAY_AT_10AM)
  // @Cron('05 * * * * *')
  async getAllTaskDAy() {
    const allTasks = await this.taskRepository.findAllStartDay();

    console.log('=== NOTIFICANDO ===');

    if (allTasks) {
      allTasks.forEach((task) => {
        const message: NotificationMessageDto = {
          name: task.user.name,
          description: task.task.description,
          email: task.user.email,
          startAt: task.task.startAt,
          endAt: task.task.endAt,
          title: task.task.title,
        };

        this.notificationClient.emit('tp_task_notification', message);
      });
    }
  }
}
