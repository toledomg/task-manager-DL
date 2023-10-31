import { hashSync } from 'bcryptjs';
import { Transform } from 'class-transformer';

import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Username é Obrigatório.' })
  username: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Email é Obrigatório.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  @Transform(({ value }: { value: string }) => hashSync(value, 10), {
    groups: ['transform'],
  })
  password: string;

  refreshToken?: string;

  created_at: Date;
  updated_at: Date;
}
