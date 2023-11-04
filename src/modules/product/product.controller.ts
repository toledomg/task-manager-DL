import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { ApiProperty, ApiBearerAuth } from '@nestjs/swagger';
import { Product } from './entities/Product.entity';
import { ProductDto } from './types/product.interfaces';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiProperty()
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() data: CreateProductDto, @Request() req): Promise<Product> {
    const userId = req.user.sub;

    return this.productService.create({
      ...data,
      userId,
    });
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
