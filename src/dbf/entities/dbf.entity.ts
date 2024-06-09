import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Dbf {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    PDOCVE: number;

    @Column()
    MATCVE: number;
}
