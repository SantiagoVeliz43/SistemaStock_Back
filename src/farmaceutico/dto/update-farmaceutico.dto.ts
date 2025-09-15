import { PartialType } from '@nestjs/mapped-types';
import { CreateFarmaceuticoDto } from './create-farmaceutico.dto';

export class UpdateFarmaceuticoDto extends PartialType(CreateFarmaceuticoDto) {}
