import { Exclude } from 'class-transformer';

export class User {
  readonly id: number;
  name: string;
  username: string;
  email: string;

  @Exclude()
  password: string;

  role: string;

  @Exclude()
  refreshToken?: string;

  @Exclude()
  created_at: Date;
  @Exclude()
  updated_at: Date;
}
