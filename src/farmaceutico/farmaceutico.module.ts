import { Module } from '@nestjs/common';
import { FarmaceuticoService } from './farmaceutico.service';
import { FarmaceuticoController } from './farmaceutico.controller';

@Module({
  controllers: [FarmaceuticoController],
  providers: [FarmaceuticoService],
})
export class FarmaceuticoModule {}
