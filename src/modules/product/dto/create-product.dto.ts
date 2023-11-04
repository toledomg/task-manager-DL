import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class CreateProductDto {
  userId: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsInt()
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
