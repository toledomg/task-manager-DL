/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from 'src/shared/decorators/user.enum';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name); // Gerar log no terminal
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async create(data: CreateUserDto) {
    const findUser = await this.usersRepository
      .findByEmail(data.email)
      .catch(() => undefined);

    if (findUser) {
      this.logger.error(`User ${data.email} already exist!`, findUser);
      throw new BadRequestException(`User ${data.email} already exist!`);
    }

    const roles = data.role ?? UserRole.User;

    const user = await this.usersRepository.create({
      ...data,
      role: roles,
    });

    return user;
  }

  async findAll() {
    return await this.usersRepository.findAll();
  }

  async findOne(id: number) {
    const findUser = await this.usersRepository.findOne(id);

    if (!findUser) {
      throw new NotFoundException(`User: ${id} not found!`);
    }

    return findUser;
  }

  async findByEmail(email: string) {
    const findUser = await this.usersRepository.findByEmail(email);

    if (!findUser) {
      throw new NotFoundException(`Email: ${email} not found!`);
    }

    return findUser;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const findUser = await this.usersRepository.update(id, updateUserDto);

    if (!findUser) {
      throw new NotFoundException(`User: ${id} not found!`);
    }

    return this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    const findUser = await this.usersRepository.findOne(id);

    if (!findUser) {
      throw new NotFoundException(`User: ${id} not found!`);
    }

    return this.usersRepository.delete(id);
  }
}
