import { Module } from "@nestjs/common";
import { DetallesRecetasService } from "./detalles-recetas.service";
import { DetallesRecetasController } from "./detalles-recetas.controller";
import { PrismaService } from "../prisma/prisma.service";

@Module({
  controllers: [DetallesRecetasController],
  providers: [DetallesRecetasService, PrismaService],
})
export class DetallesRecetasModule {}
