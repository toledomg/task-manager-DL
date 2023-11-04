import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { endOfDay, startOfDay } from 'src/utils/date';
import { CreateTaskDto, TaskNotificationDto } from '../dto/create-task.dto';
import { Task } from '../entities/task.entity';
import { TaskRepository } from './tasks.repository';

@Injectable()
export class TaskPrismaRepository implements TaskRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTaskDto): Promise<Task> {
    const task = new Task();

    Object.assign(task, {
      ...data,
    });

    const newTask = this.prisma.taskUser.create({
      data: {
        task: {
          create: {
            title: data.title,
            description: data.description,
            startAt: data.startAt,
            endAt: data.endAt,
            priority: data.priority,
            status: data.status,
          },
        },
        user: {
          connect: {
            id: data.userId,
          },
        },
      },
    });

    return plainToInstance(Task, newTask);
  }

  async findAllStartDay(): Promise<TaskNotificationDto[] | null> {
    const allTasks = await this.prisma.taskUser.findMany({
      where: {
        AND: [
          {
            task: {
              startAt: {
                gte: startOfDay(),
                lte: endOfDay(),
              },
            },
          },
        ],
      },
      include: {
        task: {
          select: {
            title: true,
            description: true,
            startAt: true,
            endAt: true,
          },
        },
        user: {
          select: {
            name: true,
            username: true,
            email: true,
          },
        },
      },
    });
    return allTasks;
  }
}
