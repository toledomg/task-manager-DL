import { Transform, Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  userId: number;

  @IsString()
  @IsNotEmpty({ message: 'Title é obrigatório.' })
  title: string;

  @IsString()
  description?: string;

  @IsNotEmpty({ message: 'Data Inicial é obrigatório.' })
  @Type(() => Date)
  @Transform(({ value }) => value && value.toISOString(), { toPlainOnly: true })
  @Transform(({ value }) => value && new Date(value), { toClassOnly: true })
  @IsDate()
  startAt?: Date;

  @IsNotEmpty({ message: 'Data Final é obrigatório.' })
  @Type(() => Date)
  @Transform(({ value }) => value && value.toISOString(), { toPlainOnly: true })
  @Transform(({ value }) => value && new Date(value), { toClassOnly: true })
  @IsDate()
  endAt?: Date;

  @IsString()
  @IsNotEmpty({ message: 'Priority é obrigatório.' })
  priority: 'BAIXA' | 'MEDIA' | 'ALTA';

  @IsString()
  @IsNotEmpty({ message: 'Status é obrigatório.' })
  status: 'PENDENTE' | 'ANDAMENTO' | 'CONCLUIDA';
}

export class ResponseTaskDto {
  id: number;
}
