import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString, Min, IsArray } from "class-validator";
import { Type } from "class-transformer";

export class UpdateProductoDto {

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value?.toLowerCase().replace(/\b\w/g, char => char.toUpperCase()))
    nombre?: string;
  
    @IsOptional()
    @IsString()
    @Transform(({ value }) => value?.trim())
    description?: string;
  
    @IsOptional()
    @Type(() => Number)
    @IsNumber({ maxDecimalPlaces: 2 })
    @Transform(({ value }) => value === '' ? undefined : value)
    price?: number;
  
    @IsOptional()
    @Type(() => Number)
    @IsNumber({ maxDecimalPlaces: 3 })
    @Min(0)
    @Transform(({ value }) => value === '' ? undefined : value)
    stock?: number;
  
    @IsOptional()
    @IsString()
    @Transform(({ value }) => value?.toUpperCase())
    sku?: string;
  
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @Transform(({ value }) => Array.isArray(value) ? value.map(url => url.trim()) : value)
    images?: string[];
  
    @IsOptional()
    @IsString()
    categoryId?: string;



}
