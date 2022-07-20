import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ClientsRepository } from 'src/database/repositories/clients.repository';
import { ProductsRepository } from 'src/database/repositories/products.repository';
import { Order } from './types/order';
import { OrderProductsDTO } from './types/orderProducts.dto';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly clientsRepository: ClientsRepository,
  ) {}
  async getProducts() {
    return this.productsRepository.findAll().then((products) =>
      products.map((product) => ({
        id: product.id,
        description: product.description,
        imageUrl: product.imageurl,
        price: product.price,
        stock: product.stock,
      })),
    );
  }

  private async computeOrderPrice(orders: Order[]) {
    const products = await this.productsRepository.findByIds(
      orders.map((order) => order.productId),
    );

    const priceByProductId: { [productId: string]: number } = products.reduce(
      (previousObject, product) => ({
        ...previousObject,
        [product.id]: product.price,
      }),
      {},
    );

    return orders.reduce(
      (previousPrice, order) =>
        previousPrice + order.quantity * priceByProductId[order.productId],
      0,
    );
  }

  async orderProducts(dto: OrderProductsDTO) {
    const CHECK_VIOLATION_CODE = '23514';
    try {
      await this.productsRepository.decreaseStocks(dto.orders);
    } catch (e) {
      if (e.code === CHECK_VIOLATION_CODE) {
        throw new BadRequestException();
      }
      throw new InternalServerErrorException();
    }

    const price = await this.computeOrderPrice(dto.orders);
    await this.clientsRepository.decreaseCredit(dto.clientId, price);
    return { status: 'success', orders: dto.orders };
  }
}
