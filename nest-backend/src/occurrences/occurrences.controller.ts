import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OccurrencesService } from './occurrences.service';
import { CreateOccurrenceDto } from './dto/create-occurrences.dto';
import { Occurrence } from './schemas/occurrence.schema';
import { UpdateOccurrencesDto } from './dto/update-occurrences.dto';

@Controller('occurrences')
export class OccurrencesController {
  constructor(private readonly occurrencesService: OccurrencesService) {}

  @Post()
  async createOccurrence(
    @Body() createOccurrenceDto: CreateOccurrenceDto,
  ): Promise<Occurrence> {
    return await this.occurrencesService.createOccurrence(createOccurrenceDto);
  }

  @Get()
  async getOccurrences(): Promise<Occurrence[]> {
    return await this.occurrencesService.getOccurrences();
  }
  @Put(':id')
  async updateOccurrence(
    @Param('id') id: string,
    @Body() updateOccurrenceDto: UpdateOccurrencesDto,
  ): Promise<Occurrence> {
    return await this.occurrencesService.updateOccurrence(
      id,
      updateOccurrenceDto,
    );
  }

  @Delete(':id')
  async deleteOccurrence(@Param('id') id: string): Promise<Occurrence> {
    return await this.occurrencesService.deleteOccurrence(id);
  }

  @Get('users/:id')
  async getOccurrencesByUser(@Param('id') id: string): Promise<Occurrence> {
    return await this.occurrencesService.getOccurrence({ userId: id });
  }
}
