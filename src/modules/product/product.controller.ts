import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiProperty } from '@nestjs/swagger';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/Product.entity';
import { ProductService } from './product.service';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { UserRole } from 'src/shared/decorators/user.enum';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiProperty()
  @Roles(UserRole.Admin)
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(
    @Body() data: CreateProductDto,
    @Request() req,
  ): Promise<Product> {
    console.log(req.user);
    const userId = req.user.sub;
    const product = await this.productService.create({
      ...data,
      userId,
    });
    return product;
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.productService.findById(+id);
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
