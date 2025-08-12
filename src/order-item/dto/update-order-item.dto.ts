import { IsOptional, IsNotEmpty, IsDecimal } from 'class-validator';

export class UpdateOrderItemDto {
  @IsOptional()
  @IsNotEmpty()
  @IsDecimal({ decimal_digits: '0,3', force_decimal: false }, { message: 'Los decimales pueden tener hasta 3 digitos, por ejemplo: 0.753' })
  quantity?: string;
}