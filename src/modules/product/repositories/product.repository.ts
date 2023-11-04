import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../entities/product.entity';

export abstract class ProductRepository {
  abstract create(data: CreateProductDto): Promise<Product>;
  abstract findAll(): Promise<Product[]>;
  abstract findByCode(code: string): Promise<Product>;
  abstract findById(id: number): Promise<Product>;
  abstract update(id: number, data: UpdateProductDto): Promise<Product>;
  abstract delete(id: number): Promise<void>;
}
