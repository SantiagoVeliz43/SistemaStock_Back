import { IsDate, isInt, isString } from "class-validator";
import { IsInt, IsString, IsIn } from 'class-validator';

export class CreatePacienteDto {
    @IsInt()
    nro_legajo: number;

    @IsString()
    nombre: string;

    @IsString()
    apellido: string;

    @IsInt()
    dni: number;

    @IsDate()
    fechaNac: Date;

    @IsString()
    telefono: string;

    @IsString()
    obraSocial: string;

    @IsString()
    direccion: string;

}

