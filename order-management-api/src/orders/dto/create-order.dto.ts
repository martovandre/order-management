import { IsString, IsNotEmpty, IsNumber, IsDecimal, IsDate, IsOptional, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  JPY = 'JPY',
}

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
  @IsEnum(Currency)
  currency: Currency;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date) // Use class-transformer to transform string to Date
  paymentDueDate: Date;
}
