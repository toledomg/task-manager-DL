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
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/shared/decorators/auth.decorators';
import { UserRole } from 'src/shared/decorators/user.enum';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

@Controller('product')
@ApiTags('Products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Auth(UserRole.Admin)
  @ApiProperty()
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(
    @Body() data: CreateProductDto,
    @Request() req,
  ): Promise<Product> {
    const userId = req.user.sub;
    const product = await this.productService.create({
      ...data,
      userId,
    });
    return product;
  }

  @Auth(UserRole.User)
  @ApiProperty()
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @ApiProperty()
  @ApiBearerAuth()
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.productService.findById(+id);
  }

  @ApiProperty()
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @ApiProperty()
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
