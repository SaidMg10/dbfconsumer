import { Module } from '@nestjs/common';
import { DbfService } from './dbf.service';
import { DbfController } from './dbf.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dbf } from './entities/dbf.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Dbf])
  ],
  controllers: [DbfController],
  providers: [DbfService],
})
export class DbfModule {}
