import { Injectable } from '@nestjs/common';
import { Client } from 'src/clients/types/client';
import { DatabaseService } from '../config/database.service';

@Injectable()
export class ClientsRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<Client[]> {
    return await this.databaseService.query('SELECT * FROM client', []);
  }

  async decreaseCredit(clientId: string, amount: number) {
    return await this.databaseService.query(
      'UPDATE client SET credit = credit - $1 WHERE id = $2',
      [amount, clientId],
    );
  }
}
