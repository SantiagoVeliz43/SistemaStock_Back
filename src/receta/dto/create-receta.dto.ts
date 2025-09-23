import { IsInt, IsString, IsIn, isString } from 'class-validator';

export class CreateRecetaDto {

    @IsInt()
    nro_receta: number;

    @IsInt()
    medicoCedula: number

    @IsInt()
    pacienteNroLegajo

}


