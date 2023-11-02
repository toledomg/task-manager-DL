import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { RolesGuard } from 'src/shared/guards/roles.guard';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(RolesGuard)
  @Post()
  async create(@Body() data: CreateTaskDto, @Request() req) {
    const userId = req.user.sub;

    return this.tasksService.create({
      ...data,
      userId,
    });
  }
}
