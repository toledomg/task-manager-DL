import { User } from 'src/modules/users/entities/user.entity';

export class LoginPayload {
  sub: number;
  email: string;

  constructor(user: User) {
    this.sub = user.id;
    this.email = user.email;
  }
}
