import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    try {
      const order = await this.prisma.order.create({
        data: {
          ...createOrderDto,
          date: new Date(createOrderDto.date),
          total: '0',
        },
      });

      return order;
    } catch (error) {
      this.handleError(error);
    }
  }

  async findAll(
    orderBy: 'orderNumber' | 'date' | 'status' | 'seller' | 'client' = 'orderNumber',
    order: 'asc' | 'desc' = 'desc',
  ) {
    let orderByObj;
  
    switch (orderBy) {
      case 'orderNumber':
        orderByObj = { orderNumber: order };
        break;
      case 'date':
        orderByObj = { date: order };
        break;
      case 'status':
        orderByObj = { status: order };
        break;
      case 'seller':
        orderByObj = { User: { fullName: order } };
        break;
      case 'client':
        orderByObj = { Client: { fullName: order } };
        break;
      default:
        orderByObj = { orderNumber: order };
    }
  
    try {
      return await this.prisma.order.findMany({
        where: {
          deletedAt: null,
          NOT: { status: 'COMPLETED' },
        },
        orderBy: orderByObj,
        include: {
          Client: {
            select: { id: true, fullName: true, address: true },
          },
          User: {
            select: { id: true, fullName: true },
          },
        },
      });
    } catch (error) {
      this.handleError(error);
    }
  }  
  
  async findOne(id: string) {
    try {
      const order = await this.prisma.order.findUnique({
        where: { id },
        select: {
          status: true,
          date: true,
          total: true,
          deletedAt: true,
          Client: {
            select: { id: true, fullName: true, address: true },
          },
          User: {
            select: { id: true, fullName: true },
          },
          orderItems: {
            where: { deletedAt: null },
            select: {
              Product: {
                select: {
                  name: true,
                },
              },
              quantity: true,
              price: true,
              subtotal: true,
            },
          },
        },
      });
  
      if (!order || order.deletedAt) {
        throw new NotFoundException('No se encontró el pedido solicitado');
      }
  
      return order;
    } catch (error) {
      this.handleError(error);
    }
  }
  
  async update(id: string, updateOrderDto: UpdateOrderDto) {
    try {
      const existingOrder = await this.prisma.order.findUnique({
        where: { id },
      });
  
      if (!existingOrder || existingOrder.deletedAt) {
        throw new NotFoundException('No se encontró el pedido solicitado');
      }

      if (existingOrder.status === 'SEND') {
        if (updateOrderDto.status !== 'COMPLETED') {
          throw new ConflictException('Solo se puede cambiar el estado de un pedido enviado a completado.');
        }
      }
      if (existingOrder.status === 'COMPLETED') {
        throw new ConflictException('No se puede modificar un pedido completado.');
      }      
  
      return await this.prisma.order.update({
        where: { id },
        data: {
          ...updateOrderDto,
          ...(updateOrderDto.date && {
            date: new Date(updateOrderDto.date),
          }),
        },
      });
    } catch (error) {
      this.handleError(error);
    }
  }  

  async remove(id: string) {
    try {
      const order = await this.findOne(id);
      if (!order) {
        throw new NotFoundException('No se encontró el pedido solicitado');
      }

      return await this.prisma.order.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any) {
    console.error(error);
    if (error instanceof ConflictException || error instanceof NotFoundException) {
      throw error;
    }
    throw new InternalServerErrorException('Ocurrió un error en el servidor');
  }

  async recalculateTotal(orderId: string) {
    try {
      const result = await this.prisma.orderItem.aggregate({
        _sum: {
          subtotal: true,
        },
        where: {
          orderId,
          deletedAt: null,
        },
      });

      const newTotal = result._sum.subtotal ?? 0;

      await this.prisma.order.update({
        where: { id: orderId },
        data: { total: newTotal.toFixed(2) },
      });

      return newTotal;
    } catch (error) {
      this.handleError(error);
    }
  }
}