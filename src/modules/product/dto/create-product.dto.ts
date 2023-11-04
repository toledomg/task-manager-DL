import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
  userId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Nome é Obrigatório.' })
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Código Produto é Obrigatório.' })
  code: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty({ message: 'Preço é Obrigatório.' })
  price: number;

  @ApiProperty()
  @IsInt()
  quantity: number;

  @ApiProperty()
  @Exclude()
  created_at: Date;

  @ApiProperty()
  @Exclude()
  updated_at: Date;
}

export class ResponseProductDto {
  id: number;
}
