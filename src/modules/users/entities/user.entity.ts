import { Exclude } from 'class-transformer';

export class User {
  readonly id: number;
  name: string;
  username: string;
  email: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
