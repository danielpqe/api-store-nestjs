import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../../entities/product.entity';
import { CreateProductDto, updateProductDto } from 'src/dto/products.dto';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: 1,
      name: 'First product',
      description: 'dsc',
      price: 100,
      stock: 10,
      image: 'img',
    },
    {
      id: 2,
      name: 'Second product',
      description: 'dsc',
      price: 200,
      stock: 20,
      image: 'img',
    },
    {
      id: 3,
      name: 'Third product',
      description: 'dsc',
      price: 300,
      stock: 30,
      image: 'img',
    },
  ];

  getProducts() {
    return this.products;
  }

  getOneProduct(id: number) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  createProduct(payload: CreateProductDto) {
    const newProduct = {
      id: this.products.length + 1,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  updateProduct(id: number, payload: updateProductDto) {
    const index = this.products.findIndex((item) => item.id === id);
    this.products[index] = {
      ...this.products[index],
      ...payload,
    };
    return this.products[index];
  }

  deleteProduct(id: number) {
    const index = this.products.findIndex((item) => item.id === id);
    const product = this.products[index];
    this.products = this.products.filter((item) => item.id !== id);
    return product;
  }
}
