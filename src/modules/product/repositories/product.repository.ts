import {
  CreateProductDto,
  ResponseProductDto,
} from '../dto/create-Product.dto';
import { UpdateProductDto } from '../dto/update-Product.dto';
import { Product } from '../entities/Product.entity';

export abstract class ProductRepository {
  abstract create(data: CreateProductDto): Promise<Product>;
  abstract findAll(): Promise<Product[]>;
  abstract findOne(id: number): Promise<Product>;
  abstract update(id: number, data: UpdateProductDto): Promise<Product>;
  abstract delete(id: number): Promise<void>;
}
