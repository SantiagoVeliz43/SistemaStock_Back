import { IsInt, IsString, IsIn, Length } from "class-validator";
import { Transform } from "class-transformer";

export class CreateFarmaceuticoDto {
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  cedula_farma: number;

  @IsString()
  @Length(0, 15, { message: "Limite de 15 caracteres" })
  nombre: string;

  @IsString()
  @Length(0, 15, { message: "Limite de 15 caracteres" })
  apellido: string;

  @IsString()
  clave_acceso: string;
}
