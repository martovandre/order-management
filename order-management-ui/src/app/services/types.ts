export interface CreateOrderDto {
  orderNumber: string;
  paymentDescription: string;
  streetAddress: string;
  town: string;
  country: string;
  amount: number;
  currency: string;
  paymentDueDate: string;
}

export interface Order extends CreateOrderDto {
  id: number | string;
}
