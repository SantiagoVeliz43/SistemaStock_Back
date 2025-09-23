import { IsInt, IsString, IsIn } from 'class-validator';
import { Especiliad } from 'generated/prisma/enums';

export class CreateMedicoDto {
  @IsInt()
  cedula_med: number;

  @IsString()
  nombre: string;

  @IsString()
  apellido: string;
  
  especialidad: Especiliad;
}
