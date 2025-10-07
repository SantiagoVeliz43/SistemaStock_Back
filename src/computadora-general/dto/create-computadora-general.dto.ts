import { IsInt, IsString, isString, IsDate, IsISO8601, Length } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateComputadoraGeneralDto {
    
    @Transform(({ value }) => parseInt(value))
    @IsInt()
    id_computadora: number;

    @IsString()
    @Length(3, 3, { message: 'clave incompatible. Ingrese 3 digitos' })
    clave_ingresada: string;

    @IsISO8601()
    fecha_expen: Date;

    @Transform(({ value }) => parseInt(value))
    @IsInt()
    farmaceuticoCedula: number;

    @Transform(({ value }) => parseInt(value))
    @IsInt()
    recetaNroReceta: number;

}
