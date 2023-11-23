import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { InicioDeSecion } from 'src/models/login.model'
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService {
    constructor(@InjectRepository (InicioDeSecion) private Login:Repository<InicioDeSecion>){

    }
    async findAll(): Promise<InicioDeSecion []>{
        return await this.Login.find();
    }
    async finById(IdUsuario:number): Promise<InicioDeSecion>{
        return await this.Login.findOneBy({Id: IdUsuario});
    }
    async create(empleados:InicioDeSecion): Promise<InicioDeSecion>{
        return await this.Login.save(empleados);
    }
    async update(empleados:InicioDeSecion): Promise<InicioDeSecion>{
        return await this.Login.save(empleados);
    }
    async delete(id: number): Promise<string>{
        await this.Login.delete(id);
        return 'Ok';
    }
    async getUserDataUserName(Usuario: string): Promise<InicioDeSecion>{
        const userDoc = await this.Login.findOne({ where: { Usuario: Usuario } });
        if (!userDoc) {
            throw new ConflictException('Usuario no encontrado');
        }
        return userDoc;
    }
    async verifyPassword(Usuario: string, Contraseña: string): Promise<boolean> {
        const user = await this.getUserDataUserName(Usuario);
        const passwordMatch = await bcrypt.compare(Contraseña, user.Contraseña);
        return passwordMatch;
    }
  async createNewUser(Usuario: InicioDeSecion): Promise<InicioDeSecion> {
    if (Usuario.Contraseña.length <= 6) {
      throw new ConflictException('La contraseña no cumple con los requisitos de seguridad (mínimo 7 caracteres)');
    }
    const lastUserId = await this.Login
      .createQueryBuilder('inicio_de_secion')
      .select('MAX(inicio_de_secion.Id)', 'maxId')
      .getRawOne();
    const newUserId = lastUserId.maxId ? lastUserId.maxId + 1 : 1;
    Usuario.Id = newUserId;
    const hashedPassword = await bcrypt.hash(Usuario.Contraseña, 10);
    const user = this.Login.create({
      Id: Usuario.Id,
      Usuario: Usuario.Usuario,
      Contraseña: hashedPassword
    });
    await this.Login.save(user);
    return user;
    }
}
