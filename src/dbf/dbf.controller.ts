import { Controller, Get, Param } from '@nestjs/common';
import { DbfService } from './dbf.service';

@Controller('dbf')
export class DbfController {
  constructor(private readonly dbfService: DbfService) {}

  @Get(':filename')
  async getDbfData(@Param('filename') filename: string): Promise<any[]> {
    const filePath = `src/dbfs-archives/${filename}.dbf`; // Replace with actual path to your DBF files
    try {
      const dbfData = await this.dbfService.readDbfFile(filePath);
      return dbfData;
    } catch (error) {
      throw new Error(`Failed to retrieve DBF data: ${error.message}`);
    }
  }
}
