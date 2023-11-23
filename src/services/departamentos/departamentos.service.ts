import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Departamentos } from 'src/models/departamentos.model';

@Injectable()
export class DepartamentosService {
    constructor(@InjectRepository (Departamentos) private empleadosRepository:Repository<Departamentos>){

    }
    async findAll(): Promise<Departamentos []>{
        return await this.empleadosRepository.find();
    }
    async finById(Id:number): Promise<Departamentos>{
        return await this.empleadosRepository.findOneBy({DepartamentoID: Id});
    }
    async create(departamentos:Departamentos): Promise<Departamentos>{
        return await this.empleadosRepository.save(departamentos);
    }
    async update(departamentos:Departamentos): Promise<Departamentos>{
        return await this.empleadosRepository.save(departamentos);
    }
    async delete(id: number): Promise<string>{
        await this.empleadosRepository.delete(id);
        return 'Ok';
    }
}
