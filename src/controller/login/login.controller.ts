import { Body, ConflictException, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { InicioDeSecion } from 'src/models/login.model';
import { LoginService } from 'src/services/login/login.service';

@Controller()
export class LoginController {
    constructor(private Login: LoginService) {

    }
    @Get('api/get/login')
    get() {
        return this.Login.findAll().then(res => {
            return { success: true, data: res }
        }).catch(error => {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        })
    }
    @Get('api/get/login/:id')
    getEmpleado(@Param('id') id) {
        return this.Login.finById(id).then(res => {
            return { success: true, data: res }
        }).catch(error => {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        })
    }
    @Post('api/post/login')
    save(@Body() empleado: InicioDeSecion) {
        return this.Login.create(empleado).then(res => {
            return { success: true, data: res }
        }).catch(error => {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        })
    }
    @Put('api/update/login')
    async update(@Body() empleado: InicioDeSecion): Promise<InicioDeSecion> {
        try {
            //Verificar si el usuario con el ID proporcionado en el objeto usuario existe
            const userExists = await this.Login.finById(empleado.Id);
            if (!userExists) {
              throw new HttpException('El usuario con el ID proporcionado no existe', HttpStatus.NOT_FOUND);
            }

            const updatedUsuario = await this.Login.update(empleado);
            if (!updatedUsuario) {
                throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
            }

            return updatedUsuario;
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @Delete('api/delete/login/:id')
    async delete(@Param('id') id: number): Promise<string> {
        try {
            // Verificar si el usuario existe antes de intentar eliminarlo
            const userExists = await this.Login.finById(id);
            if (!userExists) {
              throw new HttpException('El usuario con el ID proporcionado no existe', HttpStatus.NOT_FOUND);
            }

            await this.Login.delete(id);
            return 'Eliminado con éxito';
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @Post('/api/login')
  async login(@Body() credentials: {Usuario: string, Contraseña: string }) {
    const { Usuario, Contraseña } = credentials;
    const user = await this.Login.getUserDataUserName(Usuario);
    if (!user) {
      throw new ConflictException('Usuario no encontrado');
    }
    const isPasswordValid = await this.Login.verifyPassword(Usuario, Contraseña);
    if (!isPasswordValid) {
      throw new ConflictException('Contraseña incorrecta');
    }
    //const token = jwt.sign({ sub: user.UserName }, 'mi-llave-secreta', { expiresIn: '1h' });
    return { Estado: 'Inicio de sesión exitoso', id: user.Id, name: user.Usuario};
  }
@Get('/api/usuarioName/:name') //obtener todos los datos del usuario por el id
async getUserDataUserName(@Param('name') Usuario: string) {
  const user = await this.Login.getUserDataUserName(Usuario);
  return user;
  }
@Post('/api/usuario') //anadir nuevos usuarios
  async registerNewUser(@Body() Usuario : InicioDeSecion) {
    const user = await this.Login.createNewUser(Usuario);
    return { message: 'Usuario agregado con éxito' };
  }
}
