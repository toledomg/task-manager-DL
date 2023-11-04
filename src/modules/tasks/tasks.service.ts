import { Injectable, Logger } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskRepository } from './repositories/tasks.repository';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private readonly taskRepository: TaskRepository) {}

  create(data: CreateTaskDto): Promise<Task> {
    this.logger.log(`... Criando Task ...`, { ...data });
    return this.taskRepository.create(data);
  }
}
