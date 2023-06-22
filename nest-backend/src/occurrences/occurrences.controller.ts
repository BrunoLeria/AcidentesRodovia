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
  @UseFilters(OccurrencesExceptionFilter)
  async getOccurrencesByUser(@Param('id') id: string): Promise<Occurrence> {
    return await this.occurrencesService.getOccurrence({
      user_id: parseInt(id),
    });
  }

  @Get('filter/:registered_at/:local/:occurrence_type/:km')
  async getOccurrencesByFilter(@Param() params: any): Promise<any> {
    const args = {};
    if (params.registered_at !== 'null') {
      args['registered_at'] = { $regex: params.registered_at };
    }
    if (params.local !== 'null') {
      args['local'] = { $regex: params.local };
    }
    if (params.occurrence_type !== 'null') {
      args['occurrence_type'] = params.occurrence_type;
    }
    if (params.km !== 'null') {
      args['km'] = params.km;
    }
    return await this.occurrencesService.getOccurrence(args);
  }
}
