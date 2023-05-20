import { Injectable } from '@nestjs/common';
import { CreateOccurrenceDto } from './dto/create-occurrences.dto';
import { UpdateOccurrencesDto } from './dto/update-occurrences.dto';
import { Occurrence } from './schemas/occurrence.schema';
import { OccurrencesRepository } from './occurrences.repository';

@Injectable()
export class OccurrencesService {
  constructor(private readonly occurrencesRepository: OccurrencesRepository) {}

  async createOccurrence(
    createOccurrenceDto: CreateOccurrenceDto,
  ): Promise<Occurrence> {
    const session = await this.occurrencesRepository.startTransaction();
    try {
      const occurrenceId =
        (await this.occurrencesRepository.countDocuments()) + 1;

      const newOccurrence = {
        occurrenceId: `${occurrenceId}`,
        ...createOccurrenceDto,
      };
      const result = await this.occurrencesRepository.create(newOccurrence);
      await session.commitTransaction();
      return result;
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
    updateOccurrenceDto: UpdateOccurrencesDto,
  ): Promise<Occurrence> {
    const session = await this.occurrencesRepository.startTransaction();
    try {
      const result = await this.occurrencesRepository.findOneAndUpdate(
        { occurrenceId: parseInt(id) },
        updateOccurrenceDto,
      );
      await session.commitTransaction();
      return result;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }
  async deleteOccurrence(id: string): Promise<Occurrence> {
    const session = await this.occurrencesRepository.startTransaction();
    try {
      const result = await this.occurrencesRepository.findOneAndDelete({
        occurrenceId: id,
      });
      await session.commitTransaction();
      return result;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }
  async getOccurrence(
    getOccurrenceArgs: Partial<Occurrence>,
  ): Promise<Occurrence> {
    return this.occurrencesRepository.findOne(getOccurrenceArgs);
  }
}
