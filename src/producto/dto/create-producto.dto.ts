import { IsInt, IsString, IsIn, isString } from 'class-validator';
import { CategoriaProducto } from 'generated/prisma/enums';

export class CreateProductoDto {


    @IsString()
    nombre: string;

    @IsString()
    descripcion: string;

    @IsInt()
    stock: number;

    categProd: CategoriaProducto

}
