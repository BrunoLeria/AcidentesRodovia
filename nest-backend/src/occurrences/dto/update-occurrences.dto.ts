import { PartialType } from '@nestjs/mapped-types';
import { CreateOccurrenceDto } from './create-occurrences.dto';

export class UpdateOccurrencesDto extends PartialType(CreateOccurrenceDto) {}
