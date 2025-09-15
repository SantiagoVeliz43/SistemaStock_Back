import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MedicoService } from './medico.service';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';

@Controller('medicos')
export class MedicoController {
  constructor(private readonly medicosService: MedicoService) {}

  @Post()
  create(@Body() createMedicoDto: CreateMedicoDto) {
    return this.medicosService.create(createMedicoDto);
  }

  @Get()
  findAll() {
    return this.medicosService.findAll();
  }

  @Get(':cedula_med')
  findOne(@Param('cedula_med') id: string) {
    return this.medicosService.findOne(+id);
  }

  @Patch(':cedula_med')
  update(@Param('cedula_med') id: string, @Body() updateMedicoDto: UpdateMedicoDto) {
    return this.medicosService.update(+id, updateMedicoDto);
  }

  @Delete(':cedula_med')
  remove(@Param('cedula_med') id: string) {
    return this.medicosService.remove(+id);
  }
}
