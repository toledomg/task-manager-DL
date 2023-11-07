import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';
import { Auth } from 'src/shared/decorators/auth.decorators';
import { UserRole } from 'src/shared/decorators/user.enum';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Auth(UserRole.Admin)
  @ApiProperty()
  @ApiBearerAuth()
  @Post()
  async create(@Body() data: CreateTaskDto, @Request() req): Promise<Task> {
    const userId = req.user.sub;

    return this.tasksService.create({
      ...data,
      userId,
    });
  }
}
