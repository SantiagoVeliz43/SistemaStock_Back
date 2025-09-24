import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateComputadoraGeneralDto } from './dto/create-computadora-general.dto';
import { UpdateComputadoraGeneralDto } from './dto/update-computadora-general.dto';

@Injectable()
export class ComputadoraGeneralService {

  constructor(private prisma: PrismaService) {}
        
        async create(data: CreateComputadoraGeneralDto){
        try {
          return await this.prisma.computadoraGeneral.create({ data });
          } catch (error) {
            throw new Error(`Error al crear computadora general: ${error.message}`);
          }
        }
  
  
      async findAll() {
        return await this.prisma.computadoraGeneral.findMany({
            where: { deletedAt: null },
          });
        }    
    
      async findOne(id_computadora: number) {
          const computadoraGeneral = await this.prisma.computadoraGeneral.findFirst({
            where: { id_computadora, deletedAt: null },
          });
      
          if (!computadoraGeneral) {
            throw new NotFoundException(`Computadora general con ID ${id_computadora} no encontrado`);
          }
      
          return computadoraGeneral;
        }
  
  
      async update(id_computadora: number, data: UpdateComputadoraGeneralDto) {
          const exists = await this.prisma.computadoraGeneral.findFirst({
            where: { id_computadora, deletedAt: null },
          });
      
          if (!exists) {
            throw new NotFoundException(`No se puede actualizar: computadora general con ID ${id_computadora} no existe o está eliminado`);
          }
      
          return await this.prisma.computadoraGeneral.update({
            where: { id_computadora },
            data,
          });
        }
  
  
        async remove(id_computadora: number) {
          const exists = await this.prisma.computadoraGeneral.findFirst({
            where: { id_computadora, deletedAt: null },
          });
      
          if (!exists) {
            throw new NotFoundException(`No se puede eliminar: computadora general con ID ${id_computadora} no existe o ya está eliminado`);
          }
      
          return await this.prisma.computadoraGeneral.update({
            where: { id_computadora },
            data: {
              deletedAt: new Date(),
            },
          });
        }

}
