import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {
  constructor(private readonly prisma: PrismaService) {}

 async create(createClientDto: CreateClientDto) {
  try {
    const existingClientByEmail = await this.prisma.client.findFirst({
  where: { email: createClientDto.email,
    deletedAt: null,
   },
});

    if (existingClientByEmail) {
      throw new ConflictException('Actualemten existe un cliente con ese email');
    }

    if (createClientDto.cuit) {
      const existingClientByCuit = await this.prisma.client.findFirst({
        where: { cuit: createClientDto.cuit,
          deletedAt: null,
         },
      });
      if (existingClientByCuit) {
        throw new ConflictException('Actualmente existe un cliente con ese CUIT');
      }
    }

    const client = await this.prisma.client.create({
      data: createClientDto,
    });

    return client;
  } catch (error) {
    this.handleError(error);
  }
}


async findAll(order: 'asc' | 'desc' = 'asc') {
  try {
    return await this.prisma.client.findMany({
      where: { deletedAt: null },
      orderBy: { fullName: order },
    });
  } catch (error) {
    this.handleError(error);
  }
}


  async findOne(id: string) {
    try {
      const client = await this.prisma.client.findUnique({
        where: { id },
      });

      if (!client || client.deletedAt) {
        throw new NotFoundException('No se encontró el cliente solicitado');
      }

      return client;
    } catch (error) {
      this.handleError(error);
    }
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    try {
      const client = await this.findOne(id);
      if (!client) {
        throw new NotFoundException('No se encontró el cliente solicitado');
      }

      if (updateClientDto.email) {
        const existingClientByEmail = await this.prisma.client.findFirst({
          where: {
            email: updateClientDto.email,
            deletedAt: null,
            NOT: { id },
          },
        });
        if (existingClientByEmail) {
          throw new ConflictException('Actualmente existe un cliente con ese email');
        }
      }
  
      if (updateClientDto.cuit) {
        const existingClientByCuit = await this.prisma.client.findFirst({
          where: {
            cuit: updateClientDto.cuit,
            deletedAt: null,
            NOT: { id },
          },
        });
        if (existingClientByCuit) {
          throw new ConflictException('Actualmente existe un cliente con ese CUIT');
        }
      }

      return await this.prisma.client.update({
        where: { id },
        data: updateClientDto,
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  async remove(id: string) {
    try {
      const client = await this.findOne(id);
      if (!client) {
        throw new NotFoundException('No se encontró el cliente solicitado');
      }

      return await this.prisma.client.update({
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
}