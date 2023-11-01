import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  userId: number;

  @IsString()
  @IsNotEmpty({ message: 'Title é obrigatório.' })
  title: string;

  @IsString()
  description?: string;

  @IsString()
  // @IsNotEmpty({ message: 'Data Inicial é obrigatório.' })
  startAt?: Date;

  @IsString()
  // @IsNotEmpty({ message: 'Data Final é obrigatório.' })
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
