import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Cron, CronExpression } from '@nestjs/schedule';
import { NotificationMessageDto } from 'src/modules/tasks/dto/create-task.dto';
import { TaskRepository } from 'src/modules/tasks/repositories/tasks.repositoy';

@Injectable()
export class ScheduleService {
  constructor(
    private taskRepository: TaskRepository,
    @Inject('NOTIFICATION') private readonly notificationClient: ClientProxy,
  ) {}
  @Cron(CronExpression.EVERY_30_MINUTES)
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

        this.notificationClient.emit('task_notification', message);
      });
    }

    // console.log(allTasks);
  }
}
