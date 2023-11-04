import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductPrismaRepository } from './repositories/product.prisma.repository';
import { ProductRepository } from './repositories/product.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  controllers: [ProductController],
  providers: [
    ProductService,
    { provide: ProductRepository, useClass: ProductPrismaRepository },
  ],
})
export class ProductModule {}
