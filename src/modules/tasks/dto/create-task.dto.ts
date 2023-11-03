import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PriorityEnum, StatusEnum } from 'src/shared/decorators/user.enum';

export class CreateTaskDto {
  userId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Title é obrigatório.' })
  title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Data Inicial é obrigatório.' })
  @Type(() => Date)
  @Transform(({ value }) => value && value.toISOString(), { toPlainOnly: true })
  @Transform(({ value }) => value && new Date(value), { toClassOnly: true })
  @IsDate()
  @IsOptional()
  startAt?: Date;

  @ApiProperty()
  @IsNotEmpty({ message: 'Data Final é obrigatório.' })
  @Type(() => Date)
  @Transform(({ value }) => value && value.toISOString(), { toPlainOnly: true })
  @Transform(({ value }) => value && new Date(value), { toClassOnly: true })
  @IsDate()
  @IsOptional()
  endAt?: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Priority é obrigatório.' })
  priority: PriorityEnum;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Status é obrigatório.' })
  status: StatusEnum;
}

export class ResponseTaskDto {
  id: number;
}

export type TaskDTO = {
  title: string;
  description: string;
  startAt: Date;
  endAt: Date;
};

export type UserDTO = {
  name: string;
  username: string;
  email: string;
};

// export type TaskNotificationDto = {
//   id: number;
//   task_id: number;
//   created_at: Date;
//   updated_at: Date;
//   task: TaskDTO;
//   user: UserDTO;
// };

export type TaskNotificationDto = {
  id: number;
  task_id: number;
  created_at: Date;
  updated_at: Date;
  task: {
    title: string;
    description: string;
    startAt: Date;
    endAt: Date;
  };
  user: {
    name: string;
    username: string;
    email: string;
  };
};

export type NotificationMessageDto = {
  name: string;
  description: string;
  email: string;
  startAt: Date;
  endAt: Date;
  title: string;
};
