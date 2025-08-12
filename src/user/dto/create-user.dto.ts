import { Transform } from "class-transformer";
import { IsEmail, IsString, Length, ValidateIf } from "class-validator";

export class CreateUserDto {
    @IsString()
    @Length(8, 30, { message: 'El nombre completo debe tener entre 8 y 30 caracteres.' })
    @Transform(({ value }) => value.toLowerCase())
    fullName: string;

    @IsEmail({}, { message: 'El correo electrónico no es válido.' })
    @Transform(({ value }) => value.toLowerCase())
    email: string;

    @ValidateIf((o) => o.password)
    @IsString()
    @Length(6, 20, { message: 'La contraseña debe tener entre 6 y 20 caracteres.' })
    password: string;
}
