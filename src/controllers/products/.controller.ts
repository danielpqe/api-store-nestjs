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
  // ParseIntPipe,
} from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import { ProductsService } from '../../services/products/.service';
import { Product } from 'src/entities/product.entity';
import { CreateProductDto, updateProductDto } from 'src/dto/products.dto';

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
    @Param('id', ParseIntPipe) id: number,
  ): Product | null {
    return this.productService.getOneProduct(id);
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
  createProduct(@Body() payload: CreateProductDto): {
    message: string;
    payload: Product;
  } {
    const { name, description, price, stock, image } = payload;
    return {
      message: 'post product',
      payload: this.productService.createProduct(payload),
    };
  }

  @Put(':productId')
  updateProduct(
    @Param('productId') productId: number,
    @Body() payload: updateProductDto,
  ): { message: string; payload: Product } {
    const { name, description, price, stock, image } = payload;
    return {
      message: 'update product',
      payload: this.productService.updateProduct(+productId, payload),
    };
  }

  @Delete(':productId')
  deleteProduct(@Param('productId') productId: number): {
    message: string;
    id: number;
  } {
    return { message: 'delete product', id: productId };
  }
}
