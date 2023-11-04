import { CreateTaskDto, TaskNotificationDto } from '../dto/create-task.dto';
import { Task } from '../entities/task.entity';

export abstract class TaskRepository {
  abstract create(data: CreateTaskDto): Promise<Task>;
  abstract findAllStartDay(): Promise<TaskNotificationDto[] | null>;
}
