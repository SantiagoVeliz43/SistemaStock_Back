import { Module } from '@nestjs/common';
import { ComputadoraGeneralService } from './computadora-general.service';
import { ComputadoraGeneralController } from './computadora-general.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ComputadoraGeneralController],
  providers: [ComputadoraGeneralService, PrismaService],
})
export class ComputadoraGeneralModule {}
