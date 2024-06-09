import { Body, Controller, Get, Param, Post, Query, ValidationPipe } from '@nestjs/common';
import { DbfService } from './dbf.service';
import { CreateDbfDto } from './dto/create-dbf.dto';

@Controller('dbf')
export class DbfController {
  constructor(private readonly dbfService: DbfService) {}

  @Get(':filename')
  async getDbfData(
    @Param('filename') filename: string,
    @Query('fields') fields?: string[],
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<any[]> {
    const filePath = `src/dbfs-archives/${filename}.dbf`;

    try {
      const dbfData = await this.dbfService.readDbfFile(filePath);

      const startIndex = (page - 1) * limit;
      const paginatedData = dbfData.slice(startIndex, startIndex + limit);

      if (fields && fields.length > 0) {
        return paginatedData.map(item => {
          const filteredItem: any = {};
          fields.forEach(field => {
            filteredItem[field] = item[field];
          });
          return filteredItem;
        });
      }

      return paginatedData;
    } catch (error) {
      throw new Error(`Failed to retrieve DBF data: ${error.message}`);
    }
  }
  
  @Post('import')
  async saveDbffile(@Body(ValidationPipe) dbfDto: CreateDbfDto): Promise<string> {
    try {
      await this.dbfService.saveDbfFile(dbfDto);
      return 'Data imported successfully';
    } catch (error) {
      throw new Error(`Failed to import DBF data: ${error.message}`);
    }
  }
}
