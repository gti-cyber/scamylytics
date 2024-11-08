import { Module } from '@nestjs/common';
import { ExcelService } from 'src/excel/excel.service';
import { ScamalyticsController } from './scamalytics.controller';
import { ScamalyticsService } from './scamalytics.service';

@Module({
  controllers: [ScamalyticsController],
  providers: [ScamalyticsService, ExcelService],
})
export class ScamalyticsModule { }
