import { IsNumber, IsString } from 'class-validator';

export class Order {
  @IsString()
  productId: string;

  @IsNumber()
  quantity: number;
}
