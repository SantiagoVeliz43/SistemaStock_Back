import { IsOptional, IsNotEmpty, IsUUID, IsEnum, IsDateString } from 'class-validator';
import { Transform } from 'class-transformer';
import { PaymentMethod } from '@prisma/client';

export class CreateOrderDto {
  @IsEnum(PaymentMethod)
  @IsOptional()
  @Transform(({ value }) => value.toUpperCase())
  paymentMethod?: PaymentMethod;

  @IsDateString({}, { message: 'Se debe ingresar una fecha con formato AÑO-MES-DIA' })
  date: string;

  @IsUUID()
  @IsNotEmpty({ message: 'El ID del usuario es obligatorio' })
  userId: string;

  @IsUUID()
  @IsNotEmpty({ message: 'El ID del cliente es obligatorio' })
  clientId: string;
}