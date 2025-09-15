import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';

@Injectable()
export class PacienteService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreatePacienteDto) {
      return this.prisma.paciente.create({ data });
    }

  async findAll() {
    return this.prisma.paciente.findMany({
      where: { deletedAt: null },
    });
  }

    async findOne(nro_legajo: number) {
    const paciente = await this.prisma.paciente.findFirst({
      where: { nro_legajo, deletedAt: null },
    });

    if (!paciente) {
      throw new NotFoundException(`Paciente con legajo ${nro_legajo} no encontrado`);
    }

    return paciente;
  }

   async update(nro_legajo: number, data: UpdatePacienteDto) {
      const exists = await this.prisma.paciente.findFirst({
        where: { nro_legajo, deletedAt: null },
      });
  
      if (!exists) {
        throw new NotFoundException(`No se puede actualizar: paciente con legajo ${nro_legajo} no existe o está eliminado`);
      }
  
      return this.prisma.paciente.update({
        where: { nro_legajo },
        data,
      });
    }

    async remove(nro_legajo: number) {
    const exists = await this.prisma.paciente.findFirst({
      where: { nro_legajo, deletedAt: null },
    });

    if (!exists) {
      throw new NotFoundException(`No se puede eliminar: paciente con legajo ${nro_legajo} no existe o ya está eliminado`);
    }

    return this.prisma.paciente.update({
      where: { nro_legajo },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
