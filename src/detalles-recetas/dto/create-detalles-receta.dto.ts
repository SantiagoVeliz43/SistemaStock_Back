import { IsInt, IsString, IsIn, isString, IsDate } from 'class-validator';

export class CreateDetallesRecetaDto {

    @IsInt()
    id_detallesReceta: number;

    @IsString()
    indicaciones: string;

    @IsDate()
    fecha_emision: Date;

    @IsDate()
    fecha_vencimiento: Date;

    @IsInt()
    recetaNroReceta: number;

    @IsInt()
    productoId: number;

}

