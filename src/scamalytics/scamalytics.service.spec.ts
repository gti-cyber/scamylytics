import { Test, TestingModule } from '@nestjs/testing';
import { ScamalyticsService } from './scamalytics.service';

describe('ScamalyticsService', () => {
  let service: ScamalyticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScamalyticsService],
    }).compile();

    service = module.get<ScamalyticsService>(ScamalyticsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
