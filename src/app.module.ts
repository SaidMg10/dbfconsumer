import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbfModule } from './dbf/dbf.module';
import { DbfController } from './dbf/dbf.controller';
import { DbfService } from './dbf/dbf.service';
import { Dbf } from './dbf/entities/dbf.entity';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Dbf]),
      DbfModule,
  ],
  controllers: [DbfController],
  providers: [DbfService],
})


export class AppModule {}
