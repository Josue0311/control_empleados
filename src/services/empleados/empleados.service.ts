import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Empleados } from 'src/models/empleados.model';

@Injectable()
export class EmpleadosService {
    constructor(@InjectRepository (Empleados) private empleadosRepository:Repository<Empleados>){

    }
    async findAll(): Promise<Empleados []>{
        return await this.empleadosRepository.find();
    }
    async finById(IdUsuario:number): Promise<Empleados>{
        return await this.empleadosRepository.findOneBy({EmpleadoID: IdUsuario});
    }
    async create(empleados:Empleados): Promise<Empleados>{
        return await this.empleadosRepository.save(empleados);
    }
    async update(empleados:Empleados): Promise<Empleados>{
        return await this.empleadosRepository.save(empleados);
    }
    async delete(id: number): Promise<string>{
        await this.empleadosRepository.delete(id);
        return 'Ok';
    }
}

