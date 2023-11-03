import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeormService } from './services/typeorm/typeorm.service';
import { EmpleadosService } from './services/empleados/empleados.service';
import { EmpleadosController } from './controller/empleados/empleados.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empleados } from './models/empleados.model';
import { LoginController } from './controller/login/login.controller';
import { LoginService } from './services/login/login.service';

@Module({
  imports: [TypeOrmModule.forRootAsync({ useClass: TypeormService }),
  TypeOrmModule.forFeature([Empleados])
  ],
  controllers: [AppController, EmpleadosController, LoginController],
  providers: [AppService, TypeormService, EmpleadosService, LoginService],
})
export class AppModule { }
