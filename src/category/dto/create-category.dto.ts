import { IsString, Length } from "class-validator"

export class CreateCategoryDto {
    @IsString()
    @Length(3 , 100)
    name: string;
}
