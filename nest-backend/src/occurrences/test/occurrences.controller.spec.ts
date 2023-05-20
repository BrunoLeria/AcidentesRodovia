import { Test, TestingModule } from '@nestjs/testing';
import { OccurrencesController } from '../occurrences.controller';

describe('OccurrencesController', () => {
  let controller: OccurrencesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OccurrencesController],
    }).compile();

    controller = module.get<OccurrencesController>(OccurrencesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
