import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFarmaceuticoDto } from './dto/create-farmaceutico.dto';
import { UpdateFarmaceuticoDto } from './dto/update-farmaceutico.dto';

@Injectable()
export class FarmaceuticoService {

  constructor(private prisma: PrismaService) {}


        async create(data: CreateFarmaceuticoDto) {
        try {
          const existingFarmaceutico = await this.prisma.farmaceutico.findFirst({
            where: { nombre: data.nombre, deletedAt: null },
          });
    
          if (existingFarmaceutico) {
            throw new Error(`El farmaceutico con nombre "${data.nombre}" ya existe.`);
          }
    
    
        return await this.prisma.farmaceutico.create({ data });
        } catch (error) {
          throw new Error(`Error al crear el producto: ${error.message}`);
        }
      }

  
    async findAll() {
      return await this.prisma.farmaceutico.findMany({
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
  
      return await this.prisma.farmaceutico.update({
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

    return await this.prisma.farmaceutico.update({
      where: { cedula_farma },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
