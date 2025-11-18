
import { Transform } from 'class-transformer';
import { IsInt, IsString, Length, IsISO8601, IsOptional } from 'class-validator';

export class CreatePacienteDto {
    @Transform(({ value }) => parseInt(value))
    @IsInt()
    nro_legajo: number;

    @IsString()
    @Length(0, 15, { message: 'Limite de 15 caracteres' })
    nombre: string;

    @IsString()
    @Length(0, 15, { message: 'Limite de 15 caracteres' })
    apellido: string;

    @IsInt()
    @Transform(({ value }) => parseInt(value))
    dni: number;

    @IsISO8601()
    fechaNac: Date;

    @IsString()
    telefono: string;

    @IsString()
    @Length(0, 15, { message: 'Limite de 100 caracteres' })
    obraSocial: string;

    @IsString()
    @Length(0, 15, { message: 'Limite de 20 caracteres' })
    direccion: string;

}

