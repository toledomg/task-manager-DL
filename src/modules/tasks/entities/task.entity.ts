import { Exclude } from 'class-transformer';

export class Task {
  readonly id: number;
  title: string;
  description?: string;

  startAt?: Date;
  endAt?: Date;
  priority: string;
  status: string;

  @Exclude()
  created_at: Date;
  @Exclude()
  updated_at: Date;
}
