/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  INestApplication,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL!,
    });
    super({
      adapter,
    }); // pass adapter to PrismaClient
  }

  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    try {
      // Ensure env var don't exists..
      if (!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL environment variable is not set 📛');
      }
      await this.$connect();
      this.logger.log('✔ Connected to PostgreSQL via Prisma ✅ 🪄.');
    } catch (err) {
      this.logger.error('❌ Failed to connect to PostgreSQL.', err);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.warn('🛑 Prisma disconnected cleanly.');
  }

  async enableShutdownHooks(app: INestApplication) {
    // eslint-disable-next-line
    await (this as any).$on('beforeExit', async () => {
      this.logger.warn('⚠️ Prisma "beforeExit" trigged. Closing app...');
      await app.close();
    });
    this.logger.log('❇️ Shutdown hook enabled on PrismaService.');
  }
}
