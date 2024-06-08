import { PartialType } from '@nestjs/mapped-types';
import { CreateDbfDto } from './create-dbf.dto';

export class UpdateDbfDto extends PartialType(CreateDbfDto) {}
