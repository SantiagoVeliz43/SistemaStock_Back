import { Transform } from "class-transformer";
import { IsEmail, IsString, Length, Matches, IsOptional } from 'class-validator';

export class UpdateClientDto {
  @IsOptional()
  @IsEmail({}, { message: 'El email debe tener un formato válido' })
  @Transform(({ value }) => value.toLowerCase())
  email?: string;

  @IsOptional()
  @IsString()
  @Length(3, 30, { message: 'El nombre completo debe tener entre 3 y 30 caracteres' })
  @Transform(({ value }) => value.toLowerCase().replace(/\b\w/g, char => char.toUpperCase()))
  fullName?: string;

  @Transform(({ value }) => value === '' ? undefined : value)
  @IsOptional()
  @IsString()
  @Length(5, 100, { message: 'La dirección debe tener entre 5 y 100 caracteres' })
  address?: string;

  @Transform(({ value }) => value === '' ? undefined : value)
  @IsOptional()
  @IsString()
  @Length(9, 15, { message: 'El teléfono debe tener entre 9 y 15 caracteres (codigo de area y numero telefonico)' })
  phone?: string;

  @Transform(({ value }) => {
    if (value === '') return undefined;
    return value.replace(/^(\d{2})(\d{8})(\d{1})$/, '$1-$2-$3');
  })
  @IsOptional()
  @IsString()
  @Matches(/^(20|23|24|27|30|33|34)-\d{8}-\d$/, { message: 'El CUIT debe tener 11 dígitos, sin comas ni espacios' })
  cuit?: string;
}
