import { PartialType } from '@nestjs/swagger';
import { CreateScamalyticDto } from './create-scamalytic.dto';

export class UpdateScamalyticDto extends PartialType(CreateScamalyticDto) {}
