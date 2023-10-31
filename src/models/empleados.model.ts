import { Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Empleados{
    @PrimaryColumn()
    EmpleadoID: number;
    Nombre: string;
    Apellido:string;
    FechaNacimiento: number;
    Direccion:string;
    Telefono:string;
    CorreoElectronico:string;
    DepartamentoID:number;
}