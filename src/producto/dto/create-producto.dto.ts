import { Type } from "class-transformer";
import { IsNumber, IsString, IsOptional, IsArray, Min } from "class-validator";

export class CreateProductoDto {

  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  description?: string;


  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  price: number;


  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 3 })
  @Min(0)
  stock: number;

  @IsOptional()
  @IsString()
  sku?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @IsOptional()
  @IsString()
  categoryId?: string;


}
