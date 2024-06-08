import { Module } from '@nestjs/common';
import { DbfService } from './dbf.service';
import { DbfController } from './dbf.controller';

@Module({
  controllers: [DbfController],
  providers: [DbfService],
})
export class DbfModule {}
