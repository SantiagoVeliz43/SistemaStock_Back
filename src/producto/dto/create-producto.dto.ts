import { IsInt, IsString, IsIn, isString } from 'class-validator';

export class CreateProductoDto {
    @IsInt()
    id: number;

    @IsString()
    nombre: string;

    @IsString()
    descripcion: string;

    @IsInt()
    stock: number;

    categProd: 'INYECTABLE' | 'JARABE' | 'PILDORA' | 'SUPOSITORIO' | 'OVULO' | 'CREMA' | 'GOTA' | 'SPRAYS' | 'SUMINISTRO';

}
