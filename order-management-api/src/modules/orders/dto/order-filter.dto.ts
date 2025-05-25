import { IsOptional, IsString } from 'class-validator';

export class OrderFilterDto {
  @IsOptional()
  @IsString()
  paymentDescription?: string;

  @IsOptional()
  @IsString()
  country?: string;
}