import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
config(); // ✅ Load .env before initializing DataSource

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'programmer@1!',
  database: 'episurvdb',
  schema: 'episurv',
  entities: ['src/database/entities/*.entity{.ts,.js}'],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
});
