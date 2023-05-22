import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { OccurrencesService } from './occurrences.service';
import { CreateOccurrenceDto } from './dto/create-occurrences.dto';
import { Occurrence } from './schemas/occurrence.schema';
import { UpdateOccurrencesDto } from './dto/update-occurrences.dto';
import JwtAuthGuard from 'src/auth/guards/jwt-auth.guard';

@Controller('occurrences')
export class OccurrencesController {
  constructor(private readonly occurrencesService: OccurrencesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
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
