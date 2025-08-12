import { IsDecimal, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateOrderItemDto {
  @IsDecimal({ decimal_digits: '0,3', force_decimal: false }, { message: 'Los decimales pueden tener hasta 3 digitos, por ejemplo: 0.753' })
  @IsNotEmpty({ message: 'Es obligatorio ingresar una cantidad' })
  quantity: string;

  @IsUUID()
  @IsNotEmpty({ message: 'El ID de la orden es obligatorio' })
  orderId: string;

  @IsUUID()
  @IsNotEmpty({ message: 'El ID del producto es obligatorio' })
  productId: string;
}   