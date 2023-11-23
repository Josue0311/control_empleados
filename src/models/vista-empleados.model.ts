import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EmpleadoDepartamento{
    @PrimaryGeneratedColumn()
    ID: number
    @Column()
    Nombre: string;
    @Column()
    Apellido:string;
    @Column()
    Puesto:string;
    @Column()
    Departamento:string;
}