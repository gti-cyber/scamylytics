import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';
import { ExcelService } from '../excel/excel.service';
import { ScamalyticsService } from './scamalytics.service';

@Controller('scamalytics')
export class ScamalyticsController
{
  constructor(
    private readonly scamalyticsService: ScamalyticsService,
    private readonly excelService: ExcelService,
  ) { }

  @Post('batch')
  @ApiOperation({
    summary: 'Batch process IPs from Excel file',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Excel file containing IP addresses',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', {
    dest: './uploads',
    preservePath: true,
  }))
  async batchProcessIPs(@UploadedFile() file: Express.Multer.File)
  {
    const uploadedFilePath = file.path;
    const originalFileName = file.originalname;
    const uploadFolder = './uploads';

    // Step 1: Ensure the upload folder exists
    if (!fs.existsSync(uploadFolder))
    {
      fs.mkdirSync(uploadFolder);
    }

    // Step 2: Move the uploaded file to the upload folder
    const targetFilePath = path.join(uploadFolder, originalFileName);
    fs.renameSync(uploadedFilePath, targetFilePath);

    // Step 3: Read IPs from Excel (original file path)
    const ips = await this.excelService.readIPsFromExcel(targetFilePath);

    // Step 4: Call Scamalytics API for each IP
    const results = await this.scamalyticsService.batchGetIPDetails(ips);

    // Filter out null results
    const validResults = results.filter(result => result !== null);

    // Step 5: Prepare proxies data for writing back to Excel
    const proxies = validResults.map(result => ({
      status: result.status,
      mode: result.mode,
      ip: result.ip,
      score: result.score,
      risk: result.risk,
      url: result.url,
      creditsUsed: result.credits.used,
      creditsRemaining: result.credits.remaining,
      execTime: result.exec,
    }));
    console.log("proxies", proxies);


    // Step 6: Write results back to Excel (using original file path)
    await this.excelService.writeProxiesToExcel(targetFilePath, proxies);

    return { message: 'Batch processing complete.', filePath: targetFilePath };
  }
}
