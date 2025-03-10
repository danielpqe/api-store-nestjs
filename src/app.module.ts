import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './controllers/products/.controller';
import { CategoriesController } from './controllers/categories/.controller';
import { UsersController } from './controllers/users/.controller';
import { CustomersController } from './controllers/customers/.controller';
import { BrandsController } from './controllers/brands/.controller';
import { ProductsService } from './services/products/.service';
import { CategoriesService } from './services/categories/.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    CategoriesController,
    ProductsController,
    UsersController,
    CustomersController,
    BrandsController,
  ],
  providers: [AppService, ProductsService, CategoriesService],
})
export class AppModule {}
