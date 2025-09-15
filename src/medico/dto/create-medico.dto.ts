import { IsInt, IsString, IsIn } from 'class-validator';

export class CreateMedicoDto {
  @IsInt()
  cedula_med: number;

  @IsString()
  nombre: string;

  @IsString()
  apellido: string;
  
  especialidad: 'CLINICO' | 'CIRUJANO' | 'PEDIATRA' | 'PSQUIATRA';
}
