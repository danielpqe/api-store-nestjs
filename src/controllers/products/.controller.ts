import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  Res,
  Req,
  Provider,
  Inject,
} from '@nestjs/common';

import { Request, Response } from 'express';
import { ProductsService } from '../../services/products/.service';
import { Product } from 'src/entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get('')
  getProductsPaginated(
    @Query('limit') limit: number = 100,
    @Query('offset') offset: number = 0,
    @Query('brand') brand: string = 'apple',
  ): { message: string; payload: Product[] } {
    return { message: 'Found', payload: this.productService.getProducts() };
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getProducts(
    // @Res() response: Response,
    // @Req() Request: Request,
    @Param('id') id: number,
  ): Product | undefined {
    return this.productService.getOneProduct(+id);
    // return response.status(HttpStatus.ACCEPTED).send({
    //   message: 'Product found',
    //   id,
    // });
    // return {
    //   message: 'Product found',
    //   id,
    // };
  }

  @Post()
  createProduct(@Body() payload: any): any {
    const { name, description, price, stock, image } = payload;
    return {
      message: 'post product',
      payload: this.productService.createProduct(payload),
    };
  }

  @Put(':productId')
  updateProduct(
    @Param('productId') productId: number,
    @Body() payload: any,
  ): any {
    const { name, description, price, stock, image } = payload;
    return {
      message: 'update product',
      payload: this.productService.updateProduct(+productId, payload),
    };
  }

  @Delete(':productId')
  deleteProduct(@Param('productId') productId: number): any {
    return { message: 'delete product', id: productId };
  }
}
