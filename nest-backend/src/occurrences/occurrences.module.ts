import { Module } from '@nestjs/common';
import { OccurrencesController } from './occurrences.controller';
import { OccurrencesService } from './occurrences.service';
import { OccurrencesRepository } from './occurrences.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Occurrence, OccurrenceSchema } from './schemas/occurrence.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Occurrence.name, schema: OccurrenceSchema },
    ]),
  ],
  controllers: [OccurrencesController],
  providers: [OccurrencesService, OccurrencesRepository],
  exports: [OccurrencesService],
})
export class OccurrencesModule {}
