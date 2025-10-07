import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';

@Injectable()
export class MedicoService {

  constructor(private prisma: PrismaService) {}

   async create(data: CreateMedicoDto) {
      try {
        const existingmedico = await this.prisma.medico.findFirst({
          where: { cedula_med: data.cedula_med, deletedAt: null },
        });
  
        if (existingmedico) {
          throw new Error(`El medico con cedula "${data.cedula_med}" ya existe.`);
        }
  
  
      return await this.prisma.medico.create({ data });
      } catch (error) {
        throw new Error(`Error al crear perfil de medico: ${error.message}`);
      }
    }

  async findAll() {
    return this.prisma.medico.findMany({
      where: { deletedAt: null },
    });
  }


    async findOne(cedula_med: number) {
      const producto = await this.prisma.medico.findFirst({
        where: { cedula_med, deletedAt: null },
      });
  
      if (!producto) {
        throw new NotFoundException(`Médico con cédula ${cedula_med} no encontrado`);
      }
  
      return producto;
    }


    
  async update(cedula_med: number, data: UpdateMedicoDto) {
    const exists = await this.prisma.medico.findFirst({
      where: { cedula_med, deletedAt: null },
    });

    if (!exists) {
      throw new NotFoundException(`No se puede actualizar: médico con cédula ${cedula_med} no existe o está eliminado`);
    }

    return this.prisma.medico.update({
      where: { cedula_med },
      data,
    });
  }

  async remove(cedula_med: number) {
    const exists = await this.prisma.medico.findFirst({
      where: { cedula_med, deletedAt: null },
    });

    if (!exists) {
      throw new NotFoundException(`No se puede eliminar: médico con cédula ${cedula_med} no existe o ya está eliminado`);
    }

    return this.prisma.medico.update({
      where: { cedula_med },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}

