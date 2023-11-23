import { Injectable } from '@nestjs/common';
import {TypeOrmOptionsFactory} from '@nestjs/typeorm'
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist';

@Injectable()
export class TypeormService implements TypeOrmOptionsFactory {
    createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
        return {
            type:'mssql',
            host:'localhost',
            username:'JosueTamay',
            password:'123456',
            port:1433,
            database:'ControlEmpleadosDeUnaEmpresa',
            autoLoadEntities:true,
            synchronize:false,
            options:{encrypt:false},
            entities:['dist/**/*.model.{ts.js}']
        }
    }

}
