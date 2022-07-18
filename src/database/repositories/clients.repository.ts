import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../config/database.service';

@Injectable()
export class ClientsRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll() {
    return await this.databaseService.query('SELECT * FROM client', []);
  }
}
