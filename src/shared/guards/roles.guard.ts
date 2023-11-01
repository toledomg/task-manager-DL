/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CanActivate,
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/modules/auth/constants/constants';
import { LoginPayload } from 'src/modules/auth/dto/loginPayload-auth.dto';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { authorization } = context.switchToHttp().getRequest().headers;

    if (!authorization) {
      throw new UnauthorizedException('Token not Found');
    }
    // console.log(authorization);

    const loginPayload: LoginPayload | undefined = await this.jwtService
      .verifyAsync(authorization, {
        secret: jwtConstants.secret,
      })
      .catch(() => undefined);
    // console.log(loginPayload);

    return true;
  }
}