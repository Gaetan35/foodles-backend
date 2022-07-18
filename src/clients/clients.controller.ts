import { Controller, Get } from '@nestjs/common';
import { ClientsService } from './clients.service';

@Controller('api/clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get('/')
  async getClients() {
    return await this.clientsService.getClients();
  }
}
