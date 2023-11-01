import { Injectable } from '@nestjs/common';
import { TaskRepository } from './tasks.repositoy';
import { CreateTaskDto, ResponseTaskDto } from '../dto/create-task.dto';
import { Task } from '../entities/task.entity';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class TaskPrismaRepository implements TaskRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTaskDto): Promise<ResponseTaskDto> {
    return this.prisma.taskUser.create({
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
  }

  findAll(): Promise<Task[]> {
    throw new Error('Method not implemented.');
  }
}
