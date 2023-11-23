import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Departamentos{
    @PrimaryGeneratedColumn()
    DepartamentoID: number;
    @Column()
    NombreDepartamento: string;
}