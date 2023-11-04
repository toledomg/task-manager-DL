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
import { UserRole } from '../decorators/user.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    console.log(requiredRoles);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const { authorization } = context.switchToHttp().getRequest().headers;

    if (!authorization) {
      throw new UnauthorizedException('Token not Found');
    }
    // console.log(authorization);

    try {
      const loginPayload: LoginPayload | undefined = await this.jwtService
        .verifyAsync(authorization, {
          secret: jwtConstants.secret,
        })
        .catch(() => undefined);
      // console.log(loginPayload);

      request['user'] = loginPayload;

      return requiredRoles.some((role) => loginPayload.role.includes(role));
      //
    } catch (error) {
      throw new UnauthorizedException('Token not Found');
    }

    // return false;
  }
}
