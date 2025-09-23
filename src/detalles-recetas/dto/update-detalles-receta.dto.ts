import { PartialType } from '@nestjs/mapped-types';
import { CreateDetallesRecetaDto } from './create-detalles-receta.dto';

export class UpdateDetallesRecetaDto extends PartialType(CreateDetallesRecetaDto) {}
