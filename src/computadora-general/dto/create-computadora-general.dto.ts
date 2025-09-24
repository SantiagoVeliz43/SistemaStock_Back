import { IsInt, IsString, isString, IsDate } from 'class-validator';

export class CreateComputadoraGeneralDto {
    @IsString()
    id_computadora: number;

    @IsString()
    clave_ingresada: string;

    @IsDate()
    fecha_expen: Date;

    @IsInt()
    farmaceuticoCedula: number;

    @IsInt()
    recetaNroReceta: number;

}
