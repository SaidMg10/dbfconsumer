import { Injectable } from '@nestjs/common';
import { DBFFile } from 'dbffile';
import { CreateDbfDto } from './dto/create-dbf.dto';
import { Dbf } from './entities/dbf.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class DbfService {
  constructor(
  @InjectRepository(Dbf)
  private readonly DbfRepository : Repository<Dbf>
  ) {}

  // Leer el DBF
  // El filePath es la ruta de acceso relativa de los DBFs
  async readDbfFile(filePath: string): Promise<any[]> {
    try {
      const dbf = await DBFFile.open(filePath);
      const records = await dbf.readRecords();
      return records;
    } catch (error) {
      throw new Error(`Error reading DBF file: ${error.message}`);
    }
  }
  async saveDbfFile(createDbfDto: CreateDbfDto): Promise<void> {
    const { fileDbf } = createDbfDto;
    const filePath = `src/dbfs-archives/${fileDbf}.dbf`

    const records = await this.readDbfFile(filePath);
    const dbfRecords = records.map(record => {
      const dbfRecord = new Dbf();
      dbfRecord.PDOCVE = record['PDOCVE'];
      dbfRecord.MATCVE = record['MATCVE'];
      return dbfRecord
    })
    await this.DbfRepository.save(dbfRecords)
  }
}
