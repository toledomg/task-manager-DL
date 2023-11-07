/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './repositories/product.repository';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(private readonly productRepository: ProductRepository) {}

  async create(data: CreateProductDto): Promise<Product> {
    const findProduct = await this.productRepository
      .findByCode(data.code)
      .catch(() => undefined);

    if (findProduct) {
      this.logger.log(`... Criando Produto ...`, { ...data });
      throw new BadRequestException(`Product ${data.name} already exist!`);
    }
    const product = await this.productRepository.create(data);

    return product;
  }

  async findAll() {
    return await this.productRepository.findAll();
  }

  async findById(id: number) {
    const findProduct = await this.productRepository.findById(id);

    return findProduct;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
