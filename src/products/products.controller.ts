import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderProductsDTO } from './types/orderProducts.dto';
import { ProductsService } from './products.service';

@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/')
  async getProducts() {
    return await this.productsService.getProducts();
  }

  @Post('/order')
  async orderProducts(@Body() dto: OrderProductsDTO) {
    return await this.productsService.orderProducts(dto);
  }
}
