import { Exclude } from 'class-transformer';

export class Product {
  name: string;
  code: string;
  description: string;
  price: number;
  quantity: number;

  @Exclude()
  created_at: Date;
  @Exclude()
  updated_at: Date;
}
