import { IsInt, IsString, IsEnum, Length } from 'class-validator';
import { CategoriaProducto } from 'generated/prisma/enums';
import { Transform } from 'class-transformer';

export class CreateProductoDto {

    @Transform(({ value }) => parseInt(value))
    @IsInt()
    id: number;

    @IsString()
    @Length(0, 20, { message: 'Limite de 15 caracteres' })
    nombre: string;

    @IsString()
    @Length(0, 20, { message: 'Limite de 100 caracteres' })
    descripcion: string;

    @Transform(({ value }) => parseInt(value))
    @IsInt()
    stock: number;

    @IsEnum(CategoriaProducto)
    categProd: CategoriaProducto

}
