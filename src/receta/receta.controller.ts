import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecetaService } from './receta.service';
import { CreateRecetaDto } from './dto/create-receta.dto';
import { UpdateRecetaDto } from './dto/update-receta.dto';

@Controller('receta')
export class RecetaController {
  constructor(private readonly recetaService: RecetaService) {}

  @Post()
  create(@Body() createRecetaDto: CreateRecetaDto) {
    return this.recetaService.create(createRecetaDto);
  }

  @Get()
  findAll() {
    return this.recetaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recetaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecetaDto: UpdateRecetaDto) {
    return this.recetaService.update(+id, updateRecetaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recetaService.remove(+id);
  }
}
