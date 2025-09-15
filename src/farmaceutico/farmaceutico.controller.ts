import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FarmaceuticoService } from './farmaceutico.service';
import { CreateFarmaceuticoDto } from './dto/create-farmaceutico.dto';
import { UpdateFarmaceuticoDto } from './dto/update-farmaceutico.dto';

@Controller('farmaceutico')
export class FarmaceuticoController {
  constructor(private readonly farmaceuticoService: FarmaceuticoService) {}

  @Post()
  create(@Body() createFarmaceuticoDto: CreateFarmaceuticoDto) {
    return this.farmaceuticoService.create(createFarmaceuticoDto);
  }

  @Get()
  findAll() {
    return this.farmaceuticoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.farmaceuticoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFarmaceuticoDto: UpdateFarmaceuticoDto) {
    return this.farmaceuticoService.update(+id, updateFarmaceuticoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.farmaceuticoService.remove(+id);
  }
}
