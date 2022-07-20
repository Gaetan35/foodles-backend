import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../config/database.service';
import format from 'pg-format';
import { Product } from 'src/products/types/product';
import { Order } from 'src/products/types/order';

@Injectable()
export class ProductsRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll() {
    return await this.databaseService.query(
      'SELECT * FROM product WHERE stock > 0',
      [],
    );
  }

  async decreaseStocks(orders: Order[]) {
    await this.databaseService.query(
      format(
        'UPDATE product as p SET stock = p.stock - orders.quantity::int FROM (values %L) as orders (productid, quantity) WHERE p.id::text = orders.productid;',
        orders.map((order) => [order.productId, order.quantity]),
      ),
      [],
    );
  }

  async findByIds(productIds: string[]): Promise<Product[]> {
    return await this.databaseService.query(
      'SELECT id, price FROM product WHERE id = ANY($1::uuid[])',
      [productIds],
    );
  }
}
