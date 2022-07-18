import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService {
  private database: Pool;

  constructor() {
    this.database = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  }

  public async query(sqlQuery: string, values: Array<any>) {
    const { rows } = await this.database.query(sqlQuery, values);
    return rows;
  }
}
