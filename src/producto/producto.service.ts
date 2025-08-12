import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { PrismaService} from 'src/prisma/prisma.service';




@Injectable()
export class ProductoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductoDto: CreateProductoDto) {
    try {
      const findProduct = await this.prisma.product.findFirst({
        where: {
          name: createProductoDto.nombre,
        },
      });
      

      if (findProduct) {
        throw new ConflictException('Ya existe un producto con este nombre');
      }
      
      const producto = await this.prisma.product.create({
        data: 
        {
          name: createProductoDto.nombre,
          description: createProductoDto.description,
          price: createProductoDto.price ,
          stock: createProductoDto.stock,
          sku: createProductoDto.sku,
          images: createProductoDto.images,
          categoryId: createProductoDto.categoryId,
        }	
      });
      return producto;
    } catch (error) {
      this.handleError(error);
    }
  }
    
  

  async findAll() {
     try {
      return await this.prisma.product.findMany(); 
     }
    catch (error) {
      this.handleError(error); 
    }
  }

 async findOne(id: string)  {
    try {
      return await this.prisma.product.findUnique({
        where:{
          id: id,
        }
      });
    }catch (error) {
      this.handleError(error);
    }
  }
  
  async update(id: string, updateProductoDto: UpdateProductoDto) {
    try {
     
    
    const findProducto = await this.findOne(id);

    if (!findProducto) {
      throw new Error('Producto not found');
    }

    return await this.prisma.product.update({
      where: {
        id: id,
      },
      data: updateProductoDto
    })
  }
  catch (error) {
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

  async remove(id: string) {
    try {
    const findProducto = await this.findOne(id);

    if (!findProducto) {
      throw new Error('Producto not found');
    }
      return await this.prisma.product.update({
        where: {
          id: id,
        },
        data: {
          deletedAt: new Date(),
        }
      });
    } catch (error) {
      this.handleError(error);
      }

  }
}
