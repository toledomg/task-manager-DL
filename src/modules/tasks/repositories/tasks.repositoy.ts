import {
  CreateTaskDto,
  ResponseTaskDto,
  TaskNotificationDto,
} from '../dto/create-task.dto';

export abstract class TaskRepository {
  abstract create(data: CreateTaskDto): Promise<ResponseTaskDto>;
  abstract findAllStartDay(): Promise<TaskNotificationDto[] | null>;
}
