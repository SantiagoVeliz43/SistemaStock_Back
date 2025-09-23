import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDetallesRecetaDto } from './dto/create-detalles-receta.dto';
import { UpdateDetallesRecetaDto } from './dto/update-detalles-receta.dto';

@Injectable()
export class DetallesRecetasService {

  constructor(private prisma: PrismaService) {}
      
      async create(data: CreateDetallesRecetaDto){
      try {
        return await this.prisma.detallesReceta.create({ data });
        } catch (error) {
          throw new Error(`Error al crear detalle de receta: ${error.message}`);
        }
      }


    async findAll() {
      return await this.prisma.detallesReceta.findMany({
          where: { deletedAt: null },
        });
      }    
  
    async findOne(id_detallesReceta: number) {
        const detallesReceta = await this.prisma.detallesReceta.findFirst({
          where: { id_detallesReceta, deletedAt: null },
        });
    
        if (!detallesReceta) {
          throw new NotFoundException(`Detalle de receta con numero ${id_detallesReceta} no encontrado`);
        }
    
        return detallesReceta;
      }


    async update(id_detallesReceta: number, data: UpdateDetallesRecetaDto) {
        const exists = await this.prisma.detallesReceta.findFirst({
          where: { id_detallesReceta, deletedAt: null },
        });
    
        if (!exists) {
          throw new NotFoundException(`No se puede actualizar: Detalle de receta con numero ${id_detallesReceta} no existe o está eliminado`);
        }
    
        return await this.prisma.detallesReceta.update({
          where: { id_detallesReceta },
          data,
        });
      }


      async remove(id_detallesReceta: number) {
        const exists = await this.prisma.detallesReceta.findFirst({
          where: { id_detallesReceta, deletedAt: null },
        });
    
        if (!exists) {
          throw new NotFoundException(`No se puede eliminar: Detalle de receta con numero ${id_detallesReceta} no existe o ya está eliminado`);
        }
    
        return await this.prisma.detallesReceta.update({
          where: { id_detallesReceta },
          data: {
            deletedAt: new Date(),
          },
        });
      }
}
