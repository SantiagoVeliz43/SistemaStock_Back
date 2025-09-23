import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRecetaDto } from './dto/create-receta.dto';
import { UpdateRecetaDto } from './dto/update-receta.dto';

@Injectable()
export class RecetaService {

    constructor(private prisma: PrismaService) {}
    
    async create(data: CreateRecetaDto){
    try {
      return await this.prisma.receta.create({ data });
      } catch (error) {
        throw new Error(`Error al crear receta: ${error.message}`);
      }
    }
  
  
    async findAll() {
      return await this.prisma.receta.findMany({
          where: { deletedAt: null },
        });
      }
  
  
  
    async findOne(nro_receta: number) {
        const receta = await this.prisma.receta.findFirst({
          where: { nro_receta, deletedAt: null },
        });
    
        if (!receta) {
          throw new NotFoundException(`Receta con numero ${nro_receta} no encontrado`);
        }
    
        return receta;
      }
  
  
    async update(nro_receta: number, data: UpdateRecetaDto) {
        const exists = await this.prisma.receta.findFirst({
          where: { nro_receta, deletedAt: null },
        });
    
        if (!exists) {
          throw new NotFoundException(`No se puede actualizar: Receta con numero ${nro_receta} no existe o está eliminado`);
        }
    
        return await this.prisma.receta.update({
          where: { nro_receta },
          data,
        });
      }
  
  
    async remove(nro_receta: number) {
        const exists = await this.prisma.receta.findFirst({
          where: { nro_receta, deletedAt: null },
        });
    
        if (!exists) {
          throw new NotFoundException(`No se puede eliminar: Receta con numero ${nro_receta} no existe o ya está eliminado`);
        }
    
        return await this.prisma.receta.update({
          where: { nro_receta },
          data: {
            deletedAt: new Date(),
          },
        });
      }
}
