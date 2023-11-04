/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import {
  CreateProductDto,
  ResponseProductDto,
} from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../entities/product.entity';
import { ProductRepository } from './product.repository';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ProductPrismaRepository implements ProductRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateProductDto): Promise<Product> {
    const product = new Product();

    Object.assign(product, {
      ...data,
    });

    const newProduct = this.prisma.product.create({
      data: {
        name: data.name,
        code: data.code,
        description: data.description,
        price: data.price,
        quantity: data.quantity,
        user: {
          connect: {
            id: data.userId,
          },
        },
      },
    });
    return plainToInstance(Product, newProduct);
  }

  findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  findByCode(code: string): Promise<Product> {
    const product = this.prisma.product.findFirst({
      where: { code },
    });
    return product;
  }

  findById(id: number): Promise<Product> {
    throw new Error('Method not implemented.');
  }

  update(id: number, data: UpdateProductDto): Promise<Product> {
    throw new Error('Method not implemented.');
  }

  delete(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
