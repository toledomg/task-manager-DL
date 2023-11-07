/* eslint-disable @typescript-eslint/no-unused-vars */
import { randomInt } from 'crypto';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { User } from '../../entities/user.entity';
import { UsersRepository } from '../users.repository';
import { BadRequestException } from '@nestjs/common';

export class UserInMemoryRepository implements UsersRepository {
  users: User[] = [];

  async create(data: User): Promise<User> {
    const user: User = {
      ...data,
      id: randomInt(1, 50),
    };

    this.users.push(user);

    return user;
  }

  uploadUserAvatar(id: number, path: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async findByEmail(email: string): Promise<User | null> {
    const findUser = this.users.find((user) => user.email === email);

    return findUser ?? null;
  }

  findByUsername(username: string): Promise<User> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }

  findOne(id: number): Promise<User> {
    throw new Error('Method not implemented.');
  }

  update(id: number, data: UpdateUserDto): Promise<User> {
    throw new Error('Method not implemented.');
  }

  delete(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
