/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    const findUser = await this.prisma.users
      .findFirst({
        where: {
          OR: [{ username: data.username }, { email: data.email }],
        },
      })
      .catch(() => undefined);

    if (findUser) {
      throw new BadRequestException(`User ${data.username} already exist!`, {
        cause: new Error(), // Exemplo personalizado do erro
        description: 'Bad Request User', // Exemplo personalizado do erro
      });
    }

    const newUser = await this.prisma.users.create({
      data: {
        ...data,
      },
    });

    return plainToInstance(User, newUser);
  }

  async findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
