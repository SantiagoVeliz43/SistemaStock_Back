import { Module } from '@nestjs/common';
import { RecetaService } from './receta.service';
import { RecetaController } from './receta.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [RecetaController],
  providers: [RecetaService, PrismaService],
})
export class RecetaModule {}
