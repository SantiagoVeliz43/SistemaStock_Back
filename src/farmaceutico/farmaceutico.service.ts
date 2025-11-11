import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateFarmaceuticoDto } from "./dto/create-farmaceutico.dto";
import { UpdateFarmaceuticoDto } from "./dto/update-farmaceutico.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class FarmaceuticoService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateFarmaceuticoDto) {
    try {
      const existingFarmaceutico = await this.prisma.farmaceutico.findFirst({
        where: { cedula_farma: data.cedula_farma, deletedAt: null },
      });

      if (existingFarmaceutico) {
        throw new Error(
          `El farmaceutico con cédula "${data.cedula_farma}" ya existe.`,
        );
      }

      if (!data?.clave_acceso?.trim()) {
        throw new Error("La clave de acceso del farmacéutico es requerida.");
      }

      return await this.prisma.farmaceutico.create({
        data: {
          cedula_farma: data.cedula_farma,
          nombre: data.nombre.toLocaleLowerCase(),
          apellido: data.apellido.toLocaleLowerCase(),
          clave_acceso: bcrypt.hashSync(data.clave_acceso, 10),
        },
        select: {
          cedula_farma: true,
          nombre: true,
          apellido: true,
        },
      });
    } catch (error) {
      throw new Error(`Error al crear farmaceutico: ${error.message}`);
    }
  }

  async findAll() {
    return await this.prisma.farmaceutico.findMany({
      where: { deletedAt: null },
      select: {
        cedula_farma: true,
        nombre: true,
        apellido: true,
      },
    });
  }

  async findOne(cedula_farma: number) {
    const farmaceutico = await this.prisma.farmaceutico.findFirst({
      where: { cedula_farma, deletedAt: null },
    });

    if (!farmaceutico) {
      throw new NotFoundException(
        `Farmaceutico con cédula ${cedula_farma} no encontrado`,
      );
    }

    return farmaceutico;
  }

  async update(cedula_farma: number, data: UpdateFarmaceuticoDto) {
    const exists = await this.prisma.farmaceutico.findFirst({
      where: { cedula_farma, deletedAt: null },
    });

    if (!exists) {
      throw new NotFoundException(
        `No se puede actualizar: farmaceutico con cédula ${cedula_farma} no existe o está eliminado`,
      );
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
      throw new NotFoundException(
        `No se puede eliminar: Farmaceutico con cédula ${cedula_farma} no existe o ya está eliminado`,
      );
    }

    return await this.prisma.farmaceutico.update({
      where: { cedula_farma },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
