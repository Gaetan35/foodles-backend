import { Injectable } from '@nestjs/common';
import { ClientsRepository } from '../database/repositories/clients.repository';

@Injectable()
export class ClientsService {
  constructor(private readonly clientsRepository: ClientsRepository) {}
  async getClients() {
    return this.clientsRepository.findAll();
  }
}
