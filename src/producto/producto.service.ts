import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductoService {
  
  constructor(private prisma: PrismaService) {}
  
  async create(data: CreateProductoDto) {
    return this.prisma.producto.create({ data });
  }


  async findAll() {
    return this.prisma.producto.findMany({
        where: { deletedAt: null },
      });
    }



  async findOne(id: number) {
      const producto = await this.prisma.producto.findFirst({
        where: { id, deletedAt: null },
      });
  
      if (!producto) {
        throw new NotFoundException(`Producto con ID ${id} no encontrado`);
      }
  
      return producto;
    }


  async update(id: number, data: UpdateProductoDto) {
      const exists = await this.prisma.producto.findFirst({
        where: { id, deletedAt: null },
      });
  
      if (!exists) {
        throw new NotFoundException(`No se puede actualizar: Producto con ID ${id} no existe o está eliminado`);
      }
  
      return this.prisma.producto.update({
        where: { id },
        data,
      });
    }


  async remove(id: number) {
      const exists = await this.prisma.producto.findFirst({
        where: { id, deletedAt: null },
      });
  
      if (!exists) {
        throw new NotFoundException(`No se puede eliminar: Producto con ID ${id} no existe o ya está eliminado`);
      }
  
      return this.prisma.producto.update({
        where: { id },
        data: {
          deletedAt: new Date(),
        },
      });
    }
}
 
  

  
    
  
    
  
    
