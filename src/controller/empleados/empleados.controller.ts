import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { Empleados } from 'src/models/empleados.model';
import { EmpleadosService } from 'src/services/empleados/empleados.service';

@Controller()
export class EmpleadosController {
    constructor (private empleadosService: EmpleadosService){

    }
    @Get('api/get/empleados')
    get(){
        return this.empleadosService.findAll().then(res=>{
            return {success: true, data: res}
        }).catch(error=>{
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        })
    }
    @Post('api/post/empleados')
    save(@Body() empleado:Empleados){
        return this.empleadosService.create(empleado).then(res=>{
            return {success: true, data: res}
        }).catch(error=>{
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        })
    }
    @Post('api/update/empleados')
    update(@Body() empleado:Empleados){
        return this.empleadosService.create(empleado).then(res=>{
            return {success: true, data: res}
        }).catch(error=>{
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        })
    }
    @Get('api/delete/empleados/:id')
    delete(@Param('id') id){
        return this.empleadosService.delete(id).then(res=>{
            return {success: true, data: res}
        }).catch(error=>{
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        })
    }
}
