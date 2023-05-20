import { Test, TestingModule } from '@nestjs/testing';
import { OccurrencesService } from '../occurrences.service';

describe('OccurrencesService', () => {
  let service: OccurrencesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OccurrencesService],
    }).compile();

    service = module.get<OccurrencesService>(OccurrencesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
