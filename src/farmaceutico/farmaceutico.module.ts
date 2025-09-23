import { Module } from '@nestjs/common';
import { FarmaceuticoService } from './farmaceutico.service';
import { FarmaceuticoController } from './farmaceutico.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [PrismaService],
  controllers: [FarmaceuticoController],
  providers: [FarmaceuticoService],
})
export class FarmaceuticoModule {}
