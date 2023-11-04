/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './repositories/product.repository';
import { Product } from './entities/Product.entity';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(private readonly productRepository: ProductRepository) {}

  create(data: CreateProductDto): Promise<Product> {
    this.logger.log(`... Criando Produto ...`, { ...data });
    return this.productRepository.create(data);
  }

  findAll() {
    return this.productRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
