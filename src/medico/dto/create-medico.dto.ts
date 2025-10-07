import { IsInt, IsString, Length, IsEnum } from 'class-validator';
import { Especialidad } from 'generated/prisma/enums';
import { Transform } from 'class-transformer';

export class CreateMedicoDto {

  @Transform(({ value }) => parseInt(value))
  @IsInt()
  cedula_med: number;

  @IsString()
  @Length(0, 15, { message: 'Limite de 15 caracteres' })
  nombre: string;

  @IsString()
  @Length(0, 15, { message: 'Limite de 15 caracteres' })
  apellido: string;
  
  @IsEnum(Especialidad)
  especialidad: Especialidad;
}
