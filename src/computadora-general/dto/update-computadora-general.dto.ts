import { PartialType } from '@nestjs/mapped-types';
import { CreateComputadoraGeneralDto } from './create-computadora-general.dto';

export class UpdateComputadoraGeneralDto extends PartialType(CreateComputadoraGeneralDto) {}
