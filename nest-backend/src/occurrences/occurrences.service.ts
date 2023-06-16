import { Injectable } from '@nestjs/common';
import { OccurrenceDto } from './dto/occurrences.dto';
import { Occurrence } from './schemas/occurrence.schema';
import { OccurrencesRepository } from './occurrences.repository';

@Injectable()
export class OccurrencesService {
  constructor(private readonly occurrencesRepository: OccurrencesRepository) {}

  async createOccurrence(createOccurrenceDto: OccurrenceDto): Promise<any> {
    const session = await this.occurrencesRepository.startTransaction();
    try {
      const lastOccurrence =
        await this.occurrencesRepository.findLastDocument();
      const occurrenceId = lastOccurrence ? lastOccurrence.id + 1 : 1;

      const newOccurrence = {
        id: occurrenceId,
        ...createOccurrenceDto,
      };
      const result = await this.occurrencesRepository.create(newOccurrence);
      await session.commitTransaction();
      return {
        id: result.id,
        registered_at: result.registered_at,
        local: result.local,
        occurrence_type: result.occurrence_type,
        km: result.km,
        user_id: result.user_id,
      };
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }
  async getOccurrences(): Promise<Occurrence[]> {
    return this.occurrencesRepository.find({});
  }
  async updateOccurrence(
    id: string,
    updateOccurrenceDto: OccurrenceDto,
  ): Promise<any> {
    const session = await this.occurrencesRepository.startTransaction();
    try {
      const result = await this.occurrencesRepository.findOneAndUpdate(
        { id: parseInt(id) },
        updateOccurrenceDto,
      );
      await session.commitTransaction();
      return {
        id: result.id,
        registered_at: result.registered_at,
        local: result.local,
        occurrence_type: result.occurrence_type,
        km: result.km,
        user_id: result.user_id,
      };
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }
  async deleteOccurrence(id: string): Promise<any> {
    const session = await this.occurrencesRepository.startTransaction();
    try {
      await this.occurrencesRepository.findOneAndDelete({
        id: id,
      });
      await session.commitTransaction();
      return {
        message: 'Ocorrência excluida com sucesso',
      };
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }
  async getOccurrence(getOccurrenceArgs: Partial<Occurrence>): Promise<any> {
    return this.occurrencesRepository.find(getOccurrenceArgs);
  }
  async checkOccurrenceOwner(id: string, user_id: string): Promise<boolean> {
    const occurrence = await this.occurrencesRepository.findOne({
      id: parseInt(id),
    });

    return occurrence ? occurrence.user_id === parseInt(user_id) : true;
  }
}
