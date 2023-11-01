import { Collection, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Empleados{
    @PrimaryGeneratedColumn()
    EmpleadoID: number;
    @Column()
    Nombre: string;
    @Column()
    Apellido:string;
    @Column()
    FechaNacimiento: Date;
    @Column()
    Direccion:string;
    @Column()
    Telefono:string;
    @Column()
    CorreoElectronico:string;
    @Column()
    DepartamentoID:number;
}