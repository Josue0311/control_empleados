import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { Empleados } from 'src/models/empleados.model';
import { EmpleadosService } from 'src/services/empleados/empleados.service';

@Controller()
export class EmpleadosController {
    constructor(private empleadosService: EmpleadosService) {

    }
    @Get('api/get/empleados')
    get() {
        return this.empleadosService.findAll().then(res => {
            return { success: true, data: res }
        }).catch(error => {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        })
    }
    @Get('api/get/empleados/:id')
    getEmpleado(@Param('id') id) {
        return this.empleadosService.finById(id).then(res => {
            return { success: true, data: res }
        }).catch(error => {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        })
    }
    @Post('api/post/empleados')
    save(@Body() empleado: Empleados) {
        return this.empleadosService.create(empleado).then(res => {
            return { success: true, data: res }
        }).catch(error => {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        })
    }
    @Put('api/update/empleados')
    async update(@Body() empleado: Empleados): Promise<Empleados> {
        try {
            //Verificar si el usuario con el ID proporcionado en el objeto usuario existe
            const userExists = await this.empleadosService.finById(empleado.EmpleadoID);
            if (!userExists) {
              throw new HttpException('El usuario con el ID proporcionado no existe', HttpStatus.NOT_FOUND);
            }

            const updatedUsuario = await this.empleadosService.update(empleado);
            if (!updatedUsuario) {
                throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
            }

            return updatedUsuario;
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @Delete('api/delete/empleados/:id')
    async delete(@Param('id') id: number): Promise<string> {
        try {
            // Verificar si el usuario existe antes de intentar eliminarlo
            const userExists = await this.empleadosService.finById(id);
            if (!userExists) {
              throw new HttpException('El usuario con el ID proporcionado no existe', HttpStatus.NOT_FOUND);
            }

            await this.empleadosService.delete(id);
            return 'Eliminado con éxito';
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
