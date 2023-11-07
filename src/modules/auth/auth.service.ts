import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../users/repositories/users.repository';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import {
  RefreshJwtConstants,
  jwtConstants,
} from 'src/modules/auth/constants/constants';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly usersRepository: UsersRepository,
  ) {}
  async validateUser(userEmail: string, userPassword: string) {
    const user = await this.userService.findByEmail(userEmail);

    if (user) {
      const passwdMatch = await compare(userPassword, user.password);

      if (passwdMatch) {
        return { email: user.email };
      }
    }
    throw new NotFoundException('Email or password invalid');
  }

  async login(user: LoginAuthDto) {
    const users: User | undefined = await this.userService
      .findByEmail(user.email)
      .catch(() => undefined);

    const [token, refreshToken] = await Promise.all([
      this.jwtService.sign(
        {
          sub: users.id,
          username: users.username,
          email: users.email,
          role: users.role,
        },
        { secret: jwtConstants.secret, expiresIn: '30m' },
      ),
      this.jwtService.sign(
        {
          sub: users.id,
          username: users.username,
          email: users.email,
          role: users.role,
        },
        { secret: RefreshJwtConstants.secret, expiresIn: '4h' },
      ),
    ]);

    await this.usersRepository.update(users.id, {
      refreshToken: refreshToken,
    });

    return {
      access_token: token,
      refresh_token: refreshToken,
    };
  }
}
