import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Occurrence } from './schemas/occurrence.schema';
import { AbstractRepository } from '../database/abstract.repository';

@Injectable()
export class OccurrencesRepository extends AbstractRepository<Occurrence> {
  protected readonly logger = new Logger(OccurrencesRepository.name);

  constructor(
    @InjectModel(Occurrence.name) occurrenceModel: Model<Occurrence>,
    @InjectConnection() connection: Connection,
  ) {
    super(occurrenceModel, connection);
  }
}
