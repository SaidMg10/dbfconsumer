import { Injectable } from '@nestjs/common';
import { DBFFile } from 'dbffile';

@Injectable()
export class DbfService {
  async readDbfFile(filePath: string): Promise<any[]> {
    try {
      const dbf = await DBFFile.open(filePath);
      const records = await dbf.readRecords();
      return records;
    } catch (error) {
      throw new Error(`Error reading DBF file: ${error.message}`);
    }
  }
}
