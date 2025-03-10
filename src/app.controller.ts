import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('products/:id')
  getProducts(@Param('id') id: string): string {
    return `Producto con id: ${id}`;
  }

  @Get('categories/:categoryId/products/:productId')
  getCategories(
    @Param('categoryId') categoryId: string,
    @Param('productId') productId: string,
  ): string {
    return `Producto con categoryId: ${categoryId} y productId: ${productId}`;
  }

  @Get('products')
  getProductsPaginated(
    @Query('limit') limit: number = 100,
    @Query('offset') offset: number = 0,
    @Query('brand') brand: string = 'apple',
  ): string {
    return `Productos con limit: ${limit}, offset: ${offset} y brand: ${brand}`;
  }
}
