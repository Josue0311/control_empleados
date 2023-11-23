import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeormService } from './services/typeorm/typeorm.service';
import { EmpleadosService } from './services/empleados/empleados.service';
import { EmpleadosController } from './controller/empleados/empleados.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empleados } from './models/empleados.model';
import { InicioDeSecion} from './models/login.model';
import { LoginController } from './controller/login/login.controller';
import { LoginService } from './services/login/login.service';
import { DepartamentosController } from './controller/departamentos/departamentos.controller';
import { DepartamentosService } from './services/departamentos/departamentos.service';
import { Departamentos} from './models/departamentos.model'
import { VistaEmpleadosController } from './controller/vista-empleados/vista-empleados.controller';
import { VistaEmpleadosService } from './services/vista-empleados/vista-empleados.service';
import { EmpleadoDepartamento} from './models/vista-empleados.model'

@Module({
  imports: [TypeOrmModule.forRootAsync({ useClass: TypeormService }),
  TypeOrmModule.forFeature([Empleados]),
  TypeOrmModule.forFeature([InicioDeSecion]),
  TypeOrmModule.forFeature([Departamentos]),
  TypeOrmModule.forFeature([EmpleadoDepartamento])
  ],
  controllers: [AppController, EmpleadosController, LoginController, DepartamentosController, VistaEmpleadosController],
  providers: [AppService, TypeormService, EmpleadosService, LoginService, DepartamentosService, VistaEmpleadosService],
})
export class AppModule { }
