import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';

@Injectable()
export class OrderItemService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderItemDto: CreateOrderItemDto) {
    try {
      const order = await this.prisma.order.findUnique({
        where: { id: createOrderItemDto.orderId },
      });
      if (!order || order.deletedAt) {
        throw new NotFoundException('No se encontró el pedido solicitado');
      }

      const product = await this.prisma.product.findUnique({
        where: { id: createOrderItemDto.productId },
      });
      if (!product || product.deletedAt) {
        throw new NotFoundException('No se encontró el producto solicitado');
      }

      const existingItem = await this.prisma.orderItem.findFirst({
        where: {
          orderId: createOrderItemDto.orderId,
          productId: createOrderItemDto.productId,
          deletedAt: null,
        },
      });
      if (existingItem) {
        throw new ConflictException('El producto ya se encuentra en esta orden.');
      }

      const quantityNum = parseFloat(createOrderItemDto.quantity);
      const stockNum = parseFloat(product.stock.toString());
        if (quantityNum > stockNum) {
          throw new ConflictException(
           `La cantidad solicitada (${quantityNum}) excede el stock disponible (${stockNum}).`
         );
       }
      const priceNum = parseFloat(product.price.toString());
      const subtotal = (quantityNum * priceNum).toFixed(3);

      const orderItem = await this.prisma.orderItem.create({
        data: {
          orderId: createOrderItemDto.orderId,
          productId: createOrderItemDto.productId,
          quantity: createOrderItemDto.quantity,
          price: product.price,
          subtotal,
        },
      });

      await this.recalculateTotal(createOrderItemDto.orderId);

      return orderItem;
    } catch (error) {
      this.handleError(error);
    }
  }

  async findAll() {
    try {
      return await this.prisma.orderItem.findMany({
        where: { deletedAt: null },
        include: {
          Order: { select: { orderNumber: true, status: true } },
          Product: { select: { name: true, price: true } },
        },
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  async findOne(id: string) {
    try {
      const orderItem = await this.prisma.orderItem.findUnique({
        where: { id },
        include: {
          Order: { select: { orderNumber: true, status: true } },
          Product: { select: { name: true, price: true } },
        },
      });

      if (!orderItem || orderItem.deletedAt) {
        throw new NotFoundException('No se encontró el item solicitado');
      }

      return orderItem;
    } catch (error) {
      this.handleError(error);
    }
  }

  async update(id: string, updateOrderItemDto: UpdateOrderItemDto) {
    try {
      const existingOrderItem = await this.prisma.orderItem.findUnique({
        where: { id },
      });

      if (!existingOrderItem || existingOrderItem.deletedAt) {
        throw new NotFoundException('No se encontró el item solicitado');
      }

      const order = await this.prisma.order.findUnique({
        where: { id: existingOrderItem.orderId },
      });
      if (!order || order.deletedAt) {
        throw new NotFoundException('No se encontró el pedido relacionado');
      }
      if (order.status === 'SEND' || order.status === 'COMPLETED') {
        throw new ConflictException('No se puede modificar un item de un pedido enviado o completado');
      }

      let dataToUpdate: any = {};
      if (updateOrderItemDto.quantity !== undefined) {
        const requestedQuantity = parseFloat(updateOrderItemDto.quantity);
      
        const product = await this.prisma.product.findUnique({
          where: { id: existingOrderItem.productId },
        });
        if (!product || product.deletedAt) {
          throw new NotFoundException('No se encontró el producto solicitado');
        }
      
        const stockNum = parseFloat(product.stock.toString());
          if (requestedQuantity > stockNum) {
           throw new ConflictException(
             `La cantidad solicitada (${requestedQuantity}) excede el stock disponible (${stockNum}).`
           );
         }
        const priceNum = parseFloat(existingOrderItem.price.toString());
        const subtotal = (requestedQuantity * priceNum).toFixed(3);
      
        dataToUpdate = {
          quantity: updateOrderItemDto.quantity,
          subtotal,
        };
      }      

      const updatedOrderItem = await this.prisma.orderItem.update({
        where: { id },
        data: dataToUpdate,
      });

      await this.recalculateTotal(existingOrderItem.orderId);

      return updatedOrderItem;
    } catch (error) {
      this.handleError(error);
    }
  }

  async remove(id: string) {
    try {
      const orderItem = await this.findOne(id);
      if (!orderItem) {
        throw new NotFoundException('No se encontró el item solicitado');
      }

      const deletedOrderItem = await this.prisma.orderItem.update({
        where: { id },
        data: { deletedAt: new Date() },
      });

      await this.recalculateTotal(orderItem.orderId);

      return deletedOrderItem;
    } catch (error) {
      this.handleError(error);
    }
  }

  async recalculateTotal(orderId: string) {
    try {
      const result = await this.prisma.orderItem.aggregate({
        _sum: { subtotal: true },
        where: { orderId, deletedAt: null },
      });

      const newTotal = result._sum.subtotal ?? 0;

      await this.prisma.order.update({
        where: { id: orderId },
        data: { total: newTotal.toFixed(3) },
      });

      return newTotal;
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any) {
    console.error(error);
    if (
      error instanceof ConflictException ||
      error instanceof NotFoundException
    ) {
      throw error;
    }
    throw new InternalServerErrorException('Ocurrió un error en el servidor');
  }
}