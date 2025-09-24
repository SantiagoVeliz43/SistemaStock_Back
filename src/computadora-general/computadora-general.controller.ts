import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComputadoraGeneralService } from './computadora-general.service';
import { CreateComputadoraGeneralDto } from './dto/create-computadora-general.dto';
import { UpdateComputadoraGeneralDto } from './dto/update-computadora-general.dto';

@Controller('computadora-general')
export class ComputadoraGeneralController {
  constructor(private readonly computadoraGeneralService: ComputadoraGeneralService) {}

  @Post()
  create(@Body() createComputadoraGeneralDto: CreateComputadoraGeneralDto) {
    return this.computadoraGeneralService.create(createComputadoraGeneralDto);
  }

  @Get()
  findAll() {
    return this.computadoraGeneralService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.computadoraGeneralService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateComputadoraGeneralDto: UpdateComputadoraGeneralDto) {
    return this.computadoraGeneralService.update(+id, updateComputadoraGeneralDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.computadoraGeneralService.remove(+id);
  }
}
