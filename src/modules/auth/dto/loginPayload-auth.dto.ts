import { User } from 'src/modules/users/entities/user.entity';

export class LoginPayload {
  sub: number;
  email: string;
  role: string;

  constructor(user: User) {
    this.sub = user.id;
    this.email = user.email;
    this.role = user.role;
  }
}
