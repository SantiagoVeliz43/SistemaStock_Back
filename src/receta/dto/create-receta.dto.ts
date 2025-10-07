import { IsInt, IsString, IsIn, isString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateRecetaDto {

    @Transform(({ value }) => parseInt(value))
    @IsInt()
    nro_receta: number;

    @Transform(({ value }) => parseInt(value))
    @IsInt()
    medicoCedula: number

    @Transform(({ value }) => parseInt(value))
    @IsInt()
    pacienteNroLegajo

}


