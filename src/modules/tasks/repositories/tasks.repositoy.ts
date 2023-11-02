import { CreateTaskDto, ResponseTaskDto } from '../dto/create-task.dto';
import { Task } from '../entities/task.entity';

export abstract class TaskRepository {
  abstract create(data: CreateTaskDto): Promise<ResponseTaskDto>;
  abstract findAll(): Promise<Task[] | null>;
}
