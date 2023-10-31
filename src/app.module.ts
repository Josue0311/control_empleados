import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeormService } from './services/typeorm/typeorm.service';
import { EmpleadosService } from './services/empleados/empleados.service';
import { EmpleadosController } from './controller/empleados/empleados.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empleados } from './models/empleados.model';

@Module({
  imports: [TypeOrmModule.forRootAsync({ useClass: TypeormService }),
  TypeOrmModule.forFeature([Empleados])
  ],
  controllers: [AppController, EmpleadosController],
  providers: [AppService, TypeormService, EmpleadosService],
})
export class AppModule { }
