import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './config/database.service';
import { ClientsRepository } from './repositories/clients.repository';
import { ProductsRepository } from './repositories/products.repository';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [DatabaseService, ClientsRepository, ProductsRepository],
  exports: [DatabaseService, ClientsRepository, ProductsRepository],
})
export class DatabaseModule {}
