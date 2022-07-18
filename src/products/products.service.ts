import { Injectable } from '@nestjs/common';
import { ProductsRepository } from 'src/database/repositories/products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}
  async getProducts() {
    return this.productsRepository.findAll();
  }
}
