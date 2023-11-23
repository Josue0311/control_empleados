import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { Empleados } from 'src/models/empleados.model';
import { VistaEmpleadosService } from 'src/services/vista-empleados/vista-empleados.service';

@Controller()
export class VistaEmpleadosController {
    constructor(private empleadosService: VistaEmpleadosService) {

    }
    @Get('api/get/vista-empleados')
    get() {
        return this.empleadosService.findAll().then(res => {
            return { success: true, data: res }
        }).catch(error => {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        })
    }
}
