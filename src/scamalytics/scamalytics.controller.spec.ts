import { Test, TestingModule } from '@nestjs/testing';
import { ScamalyticsController } from './scamalytics.controller';
import { ScamalyticsService } from './scamalytics.service';

describe('ScamalyticsController', () => {
  let controller: ScamalyticsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScamalyticsController],
      providers: [ScamalyticsService],
    }).compile();

    controller = module.get<ScamalyticsController>(ScamalyticsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
