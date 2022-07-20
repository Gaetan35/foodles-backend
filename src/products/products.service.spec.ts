import { Test } from '@nestjs/testing';
import { ClientsRepository } from '../database/repositories/clients.repository';
import { ProductsRepository } from '../database/repositories/products.repository';
import { ProductsService } from './products.service';
import { OrderProductsDTO } from './types/orderProducts.dto';
import { DatabaseProduct, Product } from './types/product';

describe('ProductsService', () => {
  let service: ProductsService;

  const databaseProduct: DatabaseProduct = {
    id: 'productId',
    description: 'description',
    price: 42,
    imageurl: 'http://image.png',
    stock: 12,
  };

  const product: Product = {
    id: 'productId',
    description: 'description',
    price: 42,
    imageUrl: 'http://image.png',
    stock: 12,
  };

  const orderProductsDto: OrderProductsDTO = {
    clientId: 'clientId',
    orders: [{ productId: 'productId', quantity: 2 }],
  };
  const mockProductsRepository = {
    findAll: jest.fn(() => Promise.resolve([databaseProduct])),
    decreaseStocks: jest.fn(() => Promise.resolve()),
    findByIds: jest.fn(() => Promise.resolve([databaseProduct])),
  };

  const mockClientsRepository = {
    decreaseCredit: jest.fn(() => Promise.resolve()),
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: ClientsRepository, useValue: mockClientsRepository },
        { provide: ProductsRepository, useValue: mockProductsRepository },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getProducts', () => {
    let result: Product[];

    beforeAll(async () => {
      result = await service.getProducts();
    });

    it('should call productsRepository findAll method', () => {
      expect(mockProductsRepository.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return correct result', () => {
      expect(result).toEqual([product]);
    });
  });

  describe('orderProducts', () => {
    beforeAll(async () => {
      await service.orderProducts(orderProductsDto);
    });

    it('should call productsRepository decreaseStocks with correct params', () => {
      expect(mockProductsRepository.decreaseStocks).toHaveBeenCalledWith(
        orderProductsDto.orders,
      );
    });

    it('should call productsRepository findByIds method with correct params', () => {
      expect(mockProductsRepository.findByIds).toHaveBeenCalledWith([
        'productId',
      ]);
    });

    it('should call clientsRepository decreaseCredit method with correct params', () => {
      expect(mockClientsRepository.decreaseCredit).toHaveBeenCalledWith(
        orderProductsDto.clientId,
        42 * 2,
      );
    });
  });
});
