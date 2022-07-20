import { Test } from '@nestjs/testing';
import { Client } from './types/client';
import { ClientsService } from './clients.service';
import { ClientsRepository } from '../database/repositories/clients.repository';

describe('ClientsService', () => {
  let service: ClientsService;

  const client: Client = { id: 'clientId', email: 'mail@mail.com', credit: 42 };

  const mockClientsRepository = {
    findAll: jest.fn(() => Promise.resolve([client])),
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ClientsService,
        { provide: ClientsRepository, useValue: mockClientsRepository },
      ],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getClients', () => {
    let result: Client[];

    beforeAll(async () => {
      result = await service.getClients();
    });

    it('should call clientsRepository findAll method', () => {
      expect(mockClientsRepository.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return correct result', () => {
      expect(result).toEqual([client]);
    });
  });
});
