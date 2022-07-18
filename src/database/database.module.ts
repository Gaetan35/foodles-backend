import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './config/database.service';
import { ClientsRepository } from './repositories/clients.repository';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [DatabaseService, ClientsRepository],
  exports: [DatabaseService, ClientsRepository],
})
export class DatabaseModule {}
