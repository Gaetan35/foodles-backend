import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DatabaseService } from '../config/database.service';
import format from 'pg-format';
import { DatabaseProduct } from 'src/products/types/product';
import { Order } from 'src/products/types/order';

const CHECK_VIOLATION_CODE = '23514';

@Injectable()
export class ProductsRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<DatabaseProduct[]> {
    return await this.databaseService.query(
      'SELECT * FROM product WHERE stock > 0',
      [],
    );
  }

  async decreaseStocks(orders: Order[]) {
    try {
      await this.databaseService.query(
        format(
          'UPDATE product as p SET stock = p.stock - orders.quantity::int FROM (values %L) as orders (productid, quantity) WHERE p.id::text = orders.productid;',
          orders.map((order) => [order.productId, order.quantity]),
        ),
        [],
      );
    } catch (e) {
      if (e.code === CHECK_VIOLATION_CODE) {
        throw new BadRequestException();
      }
      throw new InternalServerErrorException();
    }
  }

  async findByIds(productIds: string[]): Promise<DatabaseProduct[]> {
    return await this.databaseService.query(
      'SELECT id, price FROM product WHERE id = ANY($1::uuid[])',
      [productIds],
    );
  }
}
