import { ApiProperty } from '@nestjs/swagger';
import { hashSync } from 'bcryptjs';
import { Transform } from 'class-transformer';

import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Username é Obrigatório.' })
  username: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty({ message: 'Email é Obrigatório.' })
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  @Transform(({ value }: { value: string }) => hashSync(value, 10), {
    groups: ['transform'],
  })
  password: string;

  @ApiProperty({
    // description: `RefreshToken for update token`,
    // example: ['refresh_token'],
  })
  @IsOptional()
  refreshToken?: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
