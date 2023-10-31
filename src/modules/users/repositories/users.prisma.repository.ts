/* eslint-disable @typescript-eslint/no-unused-vars */
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { UsersRepository } from './users.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersPrismaRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    const user = new User();

    Object.assign(user, {
      ...data,
    });

    const newUser = await this.prisma.users.create({
      data: { ...user },
    });

    return plainToInstance(User, newUser);
  }
  async findAll(): Promise<User[]> {
    const users = await this.prisma.users.findMany();

    return plainToInstance(User, users);
  }

  async findOne(id: number): Promise<User> {
    const user = this.prisma.users.findUnique({
      where: { id },
    });
    return plainToInstance(User, user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.users.findUnique({
      where: { email },
    });

    return user;
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.prisma.users.findUnique({
      where: { username },
    });

    return user;
  }

  async update(id: number, data: UpdateUserDto): Promise<User> {
    const user = await this.prisma.users.update({
      where: { id },
      data: { ...data },
    });

    return plainToInstance(User, user);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.users.delete({
      where: { id },
    });
  }
}
