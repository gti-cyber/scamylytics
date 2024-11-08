import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { ExcelService } from './excel/excel.service';
import { ScamalyticsController } from './scamalytics/scamalytics.controller';
import { ScamalyticsModule } from './scamalytics/scamalytics.module';
import { ScamalyticsService } from './scamalytics/scamalytics.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScamalyticsModule,
    MulterModule.register({
      dest: './uploads', // Destination folder for uploaded files
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
  controllers: [ScamalyticsController],
  providers: [ScamalyticsService, ExcelService],
})
export class AppModule { }
