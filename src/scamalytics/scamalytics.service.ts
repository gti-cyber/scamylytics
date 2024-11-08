import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class ScamalyticsService
{
  private readonly hostname: string = process.env.SCAMALYTICS_HOSTNAME;
  private readonly username: string = process.env.SCAMALYTICS_USERNAME;
  private readonly key: string = process.env.SCAMALYTICS_KEY;

  async getIPDetails(ip: string): Promise<any>
  {
    try
    {
      const response = await axios.get(`https://${this.hostname}/${this.username}/?ip=${ip}&key=${this.key}`);


      return response.data;
    } catch (error)
    {
      console.error(`Error calling Scamalytics API for IP ${ip}:`, error);
      return null;
    }
  }

  async batchGetIPDetails(ips: string[])
  {
    const promises = ips.map(ip => this.getIPDetails(ip));
    const result = await Promise.all(promises);

    return result;
  }
}
