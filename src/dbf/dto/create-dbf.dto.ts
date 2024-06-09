import { IsString } from "class-validator";

export class CreateDbfDto {
    @IsString()
    fileDbf: string;
}
