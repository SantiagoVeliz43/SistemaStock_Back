import { IsOptional, IsEnum, IsDateString } from 'class-validator';
import { Transform } from 'class-transformer';
import { Status, PaymentMethod } from '@prisma/client';

export class UpdateOrderDto {
  @IsEnum(Status)
  @IsOptional()
  @Transform(({ value }) => value.toUpperCase())
  status?: Status;

  @IsEnum(PaymentMethod)
  @IsOptional()
  @Transform(({ value }) => value.toUpperCase())
  paymentMethod?: PaymentMethod;

  @IsDateString({}, { message: 'La fecha ingresada debe tener un formato AÑO-MES-DIA' })
  @IsOptional()
  date?: string;
}