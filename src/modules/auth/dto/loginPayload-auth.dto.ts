import { User } from 'src/modules/users/entities/user.entity';

export class LoginPayload {
  sub: number;

  constructor(user: User) {
    this.sub = user.id;
  }
}
