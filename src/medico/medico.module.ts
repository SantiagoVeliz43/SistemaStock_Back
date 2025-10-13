import { Module } from "@nestjs/common";
import { MedicoService } from "./medico.service";
import { MedicoController } from "./medico.controller";
import { PrismaService } from "../prisma/prisma.service";

@Module({
  controllers: [MedicoController],
  providers: [MedicoService, PrismaService],
})
export class MedicoModule {}
