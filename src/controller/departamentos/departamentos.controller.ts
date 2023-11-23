import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { Departamentos } from 'src/models/departamentos.model';
import { DepartamentosService } from 'src/services/departamentos/departamentos.service';
@Controller('')
export class DepartamentosController {
    constructor(private empleadosService: DepartamentosService) {

    }
    @Get('api/get/departamentos')
    get() {
        return this.empleadosService.findAll().then(res => {
            return { success: true, data: res }
        }).catch(error => {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        })
    }
    @Get('api/get/departamentos/:id')
    getEmpleado(@Param('id') id) {
        return this.empleadosService.finById(id).then(res => {
            return { success: true, data: res }
        }).catch(error => {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        })
    }
    @Post('api/post/departamentos')
    save(@Body() empleado: Departamentos) {
        return this.empleadosService.create(empleado).then(res => {
            return { success: true, data: res }
        }).catch(error => {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        })
    }
    @Put('api/update/departamentos')
    async update(@Body() departamento: Departamentos): Promise<Departamentos> {
        try {
            //Verificar si el usuario con el ID proporcionado en el objeto usuario existe
            const userExists = await this.empleadosService.finById(departamento.DepartamentoID);
            if (!userExists) {
              throw new HttpException('El usuario con el ID proporcionado no existe', HttpStatus.NOT_FOUND);
            }

            const updatedUsuario = await this.empleadosService.update(departamento);
            if (!updatedUsuario) {
                throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
            }

            return updatedUsuario;
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @Delete('api/delete/departamentos/:id')
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
