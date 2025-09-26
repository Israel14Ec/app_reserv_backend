import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ){}

 async create(createUsuarioDto: CreateUsuarioDto) {
    
    //Validar que el email sea único
    const userExist = await this.usuarioRepository.exists({
      where: {
        email: createUsuarioDto.email
      }
    }) 

    //Email pertenece a otro usuario
    if (userExist) {
      throw new BadRequestException('El email ya está registrado');
    }

    //Hash password
    const hashPassword = await bcrypt.hash(
      createUsuarioDto.password,
      +process.env.SALT!,
    );

    const newUser = await this.usuarioRepository.save({
      ...createUsuarioDto,
      password: hashPassword
    })

    const { password, ...newUserWithoutPassword } = newUser;

    return {
      data: newUserWithoutPassword,
      message: "Usuario creado correctamente"
    }

  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    
    const usuarioUpdate = {
      nombre: updateUsuarioDto.name,
      celular: updateUsuarioDto.celular,
    }
    await this.usuarioRepository.update(id, usuarioUpdate);
    return {
      message: "Perfil de usuario actualizado correctamente"
    };
  }
}
