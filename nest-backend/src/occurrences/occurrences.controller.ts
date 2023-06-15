import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { OccurrencesService } from './occurrences.service';
import { OccurrenceDto } from './dto/occurrences.dto';
import { Occurrence } from './schemas/occurrence.schema';
import JwtAuthGuard from 'src/auth/guards/jwt-auth.guard';
import { OccurrencesExceptionFilter } from './exceptions/occurrences.excepetion.filter';

@Controller('occurrences')
export class OccurrencesController {
  constructor(private readonly occurrencesService: OccurrencesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseFilters(OccurrencesExceptionFilter)
  async createOccurrence(
    @Body() createOccurrenceDto: OccurrenceDto,
  ): Promise<Occurrence> {
    return await this.occurrencesService.createOccurrence(createOccurrenceDto);
  }

  @Get()
  async getOccurrences(): Promise<Occurrence[]> {
    return await this.occurrencesService.getOccurrences();
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseFilters(OccurrencesExceptionFilter)
  async updateOccurrence(
    @Param('id') id: string,
    @Body() updateOccurrenceDto: OccurrenceDto,
  ): Promise<Occurrence> {
    return await this.occurrencesService.updateOccurrence(
      id,
      updateOccurrenceDto,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseFilters(OccurrencesExceptionFilter)
  async deleteOccurrence(@Param('id') id: string): Promise<Occurrence> {
    return await this.occurrencesService.deleteOccurrence(id);
  }

  @Get('users/:id')
  @UseGuards(JwtAuthGuard)
  async getOccurrencesByUser(@Param('id') id: string): Promise<Occurrence> {
    return await this.occurrencesService.getOccurrence({
      user_id: parseInt(id),
    });
  }
}
