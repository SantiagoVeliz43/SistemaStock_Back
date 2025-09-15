import { IsInt, IsString, IsIn } from 'class-validator';

export class CreateFarmaceuticoDto {
    @IsInt()
    cedula_farma: number;

    @IsString()
    nombre: string;

    @IsString()
    apellido: string;

    @IsInt()
    clave_acceso: number;
}
