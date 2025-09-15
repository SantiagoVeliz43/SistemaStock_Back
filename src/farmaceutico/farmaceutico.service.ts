import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFarmaceuticoDto } from './dto/create-farmaceutico.dto';
import { UpdateFarmaceuticoDto } from './dto/update-farmaceutico.dto';

@Injectable()
export class FarmaceuticoService {
  constructor(private prisma: PrismaService) {}

   async create(data: CreateFarmaceuticoDto) {
      return this.prisma.farmaceutico.create({ data });
    }
  
    async findAll() {
      return this.prisma.farmaceutico.findMany({
        where: { deletedAt: null },
      });
    }


  async findOne(cedula_farma: number) {
    const farmaceutico = await this.prisma.farmaceutico.findFirst({
      where: { cedula_farma, deletedAt: null },
    });

    if (!farmaceutico) {
      throw new NotFoundException(`Farmaceutico con cédula ${cedula_farma} no encontrado`);
    }

    return farmaceutico;
  }


    async update(cedula_farma: number, data: UpdateFarmaceuticoDto) {
      const exists = await this.prisma.farmaceutico.findFirst({
        where: { cedula_farma, deletedAt: null },
      });
  
      if (!exists) {
        throw new NotFoundException(`No se puede actualizar: farmaceutico con cédula ${cedula_farma} no existe o está eliminado`);
      }
  
      return this.prisma.farmaceutico.update({
        where: { cedula_farma },
        data,
      });
    }


    async remove(cedula_farma: number) {
    const exists = await this.prisma.farmaceutico.findFirst({
      where: { cedula_farma, deletedAt: null },
    });

    if (!exists) {
      throw new NotFoundException(`No se puede eliminar: Farmaceutico con cédula ${cedula_farma} no existe o ya está eliminado`);
    }

    return this.prisma.farmaceutico.update({
      where: { cedula_farma },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
