import { IsString, IsEmail, Length } from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginDto {
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @IsString()
  @Length(6, 20, { message: 'La contraseña debe ser entre 6 y 20 caracteres' })
  password: string;
}
