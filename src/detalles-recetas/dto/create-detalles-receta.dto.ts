import { IsInt, IsString, IsDate, IsISO8601, Length } from 'class-validator';
import { Transform } from 'class-transformer';
export class CreateDetallesRecetaDto {

    @Transform(({ value }) => parseInt(value))
    @IsInt()
    id_detallesReceta: number;

    @Length(0, 100, { message: 'Limite de 100 caracteres' })
    @IsString()
    indicaciones: string;

    @IsISO8601()
    fecha_emision: Date;

    @IsISO8601()
    fecha_vencimiento: Date;

    @Transform(({ value }) => parseInt(value))
    @IsInt()
    recetaNroReceta: number;

    @Transform(({ value }) => parseInt(value))
    @IsInt()
    productoId: number;

}

