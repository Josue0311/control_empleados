import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { EmpleadoDepartamento } from 'src/models/vista-empleados.model';

@Injectable()
export class VistaEmpleadosService {
    constructor(@InjectRepository (EmpleadoDepartamento) private empleadosRepository:Repository<EmpleadoDepartamento>){

    }
    async findAll(): Promise<EmpleadoDepartamento []>{
        return await this.empleadosRepository.find();
    }
    // async finById(IdUsuario:number): Promise<Empleados>{
    //     return await this.empleadosRepository.findOneBy({EmpleadoID: IdUsuario});
    // }
    // async create(empleados:Empleados): Promise<Empleados>{
    //     return await this.empleadosRepository.save(empleados);
    // }
    // async update(empleados:Empleados): Promise<Empleados>{
    //     return await this.empleadosRepository.save(empleados);
    // }
    // async delete(id: number): Promise<string>{
    //     await this.empleadosRepository.delete(id);
    //     return 'Ok';
    // }
}
