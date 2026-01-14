import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service.js';

@Global() // Available to all services, the "PrismaService"
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // export: can others services imports too
})
export class PrismaModule {}
