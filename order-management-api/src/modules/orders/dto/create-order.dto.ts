import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsDecimal,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  orderNumber: string;

  @IsNotEmpty()
  @IsString()
  paymentDescription: string;

  @IsNotEmpty()
  @IsString()
  streetAddress: string;

  @IsNotEmpty()
  @IsString()
  town: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsDecimal()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  currency: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  paymentDueDate: Date;
}
