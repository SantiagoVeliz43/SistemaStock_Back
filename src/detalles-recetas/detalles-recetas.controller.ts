import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetallesRecetasService } from './detalles-recetas.service';
import { CreateDetallesRecetaDto } from './dto/create-detalles-receta.dto';
import { UpdateDetallesRecetaDto } from './dto/update-detalles-receta.dto';

@Controller('detalles-recetas')
export class DetallesRecetasController {
  constructor(private readonly detallesRecetasService: DetallesRecetasService) {}

  @Post()
  create(@Body() createDetallesRecetaDto: CreateDetallesRecetaDto) {
    return this.detallesRecetasService.create(createDetallesRecetaDto);
  }

  @Get()
  findAll() {
    return this.detallesRecetasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detallesRecetasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetallesRecetaDto: UpdateDetallesRecetaDto) {
    return this.detallesRecetasService.update(+id, updateDetallesRecetaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detallesRecetasService.remove(+id);
  }
}
