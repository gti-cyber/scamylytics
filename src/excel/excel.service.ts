import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';

@Injectable()
export class ExcelService
{
    async readIPsFromExcel(filePath: string): Promise<string[]>
    {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePath);
        const worksheet = workbook.getWorksheet('Input');
        const ips: string[] = [];

        worksheet.eachRow((row, rowNumber) =>
        {
            if (rowNumber > 1)
            { // Assuming the first row is the header
                const ip = row.getCell(1).text;
                if (ip)
                {
                    ips.push(ip);
                }
            }
        });

        return ips;
    }

    async writeProxiesToExcel(filePath: string, proxies: any[]): Promise<void>
    {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePath);
        const worksheet = workbook.getWorksheet('Result');

        // Add headers
        const headers = ['IP', 'Status', 'Mode', 'Score', 'Risk', 'URL', 'Credits Used', 'Credits Remaining', 'Exec Time'];
        worksheet.insertRow(1, headers);

        // Clear existing data
        worksheet.eachRow((row, rowNumber) =>
        {
            if (rowNumber > 1)
            {
                worksheet.spliceRows(rowNumber, 1);
            }
        });

        // Add proxy data
        proxies.forEach(proxy =>
        {
            worksheet.addRow([
                proxy.ip,
                proxy.status,
                proxy.mode,
                proxy.score,
                proxy.risk,
                proxy.url,
                proxy.creditsUsed,
                proxy.creditsRemaining,
                proxy.execTime,
            ]);
        });

        await workbook.xlsx.writeFile(filePath);
    }
}
