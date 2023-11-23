import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class InicioDeSecion{
    @PrimaryGeneratedColumn()
    Id: number;
    @Column()
    Usuario: string;
    @Column()
    Contraseña:string;
    @Column()
    Rol:string;
}