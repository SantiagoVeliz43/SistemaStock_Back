import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {

  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto) {
    try {
      const existCategory = await this.prisma.category.findUnique({
        where: {
          name: createCategoryDto.name as string
        }
      });

      if (existCategory) {
        throw new ConflictException('Ya existe una categoría con este nombre');
      }
      
      const Category = await this.prisma.category.create({
        data: {
          name: createCategoryDto.name as string,
        }
      });

      return Category;
    }catch (error) {
      this.handleError(error);
    }
  }

  async findAll() {
    try {
      return await this.prisma.category.findMany({
        where: {
          deletedAt: null
        },
        select : {
          id : true,
          name : true
        }
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  async findOne(id: string) {
    try {
      return await this.prisma.category.findFirst({
        where: {
          id: id,
          deletedAt: null
        },
        select : {
          id : true,
          name : true
        }
      });
    }catch (error) {
      this.handleError(error);
    }
  }

  async update(id: string, updateCategoryDto) {
    try {
      const findCategory = await this.findOne(id);

      if (!findCategory) {
        throw new NotFoundException('Categoria no encontrada');
      }

      const Category = await this.prisma.category.update({
        where: {
          id: id
        },
        data: updateCategoryDto
      })

      return Category;
    }catch (error) {
      this.handleError(error);
    } 
  }

  async remove(id: string) {
    try {
      const findCategory = await this.findOne(id);

      if (!findCategory) {
        throw new NotFoundException('Categoría no encontrada');
      }

      return await this.prisma.category.update({
        where: {
          id: id,
        },
        data: {
          deletedAt: new Date
        }
      });
    }catch (error) {
      this.handleError(error);
    }
  }

  handleError(error: any) {
    console.log(error);

    if (error instanceof ConflictException) {
      throw new ConflictException(error.message);
    } else {
      throw new InternalServerErrorException('Error creating user');
    }

  }
}
