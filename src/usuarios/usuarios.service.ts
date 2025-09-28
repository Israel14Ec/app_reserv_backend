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
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    //Validar que el email sea único
    const userExist = await this.usuarioRepository.exists({
      where: {
        email: createUsuarioDto.email,
      },
    });

    //Email pertenece a otro usuario
    if (userExist) {
      throw new BadRequestException('El email ya está registrado');
    }

    //Validar que el número de telefóno sea único
    if (createUsuarioDto.celular) {
      const numberExist = await this.usuarioRepository.exists({
        where: { celular: createUsuarioDto.celular },
      });

      if (numberExist) {
        throw new BadRequestException(
          'El número de celular ya está registrado',
        );
      }
    }

    //Valirar que el número de cédula sea único
    const identificacionExiste = await this.usuarioRepository.exists({
      where: {
        ci_ruc: createUsuarioDto.ci_ruc,
      },
    });

    if (identificacionExiste) {
      throw new BadRequestException(
        'El número de cédula o RUC ya está registrado',
      );
    }

    //Hash password
    const hashPassword = await bcrypt.hash(
      createUsuarioDto.password,
      +process.env.SALT!,
    );

    const newUser = await this.usuarioRepository.save({
      ...createUsuarioDto,
      password: hashPassword,
      nombre: createUsuarioDto.name,
    });

    const { password, ...newUserWithoutPassword } = newUser;

    return {
      data: newUserWithoutPassword,
      message: 'Usuario creado correctamente',
    };
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    // Validar número de teléfono único y que no pertenezca al mismo usuario
    if (updateUsuarioDto.celular) {
      const numberExist = await this.usuarioRepository.findOne({
        where: { celular: updateUsuarioDto.celular },
      });

      if (numberExist && numberExist.id !== id) {
        throw new BadRequestException(
          'El número de celular ya está registrado',
        );
      }
    }

    // Validar que el ci_cedula sea único y no pertenezca a otro usuario
    if (updateUsuarioDto.ci_ruc) {
      const ciExist = await this.usuarioRepository.findOne({
        where: { ci_ruc: updateUsuarioDto.ci_ruc },
      });

      if (ciExist && ciExist.id !== id) {
        throw new BadRequestException('La cédula o RUC ya está registrada');
      }
    }

    const usuarioUpdate = {
      nombre: updateUsuarioDto.name,
      celular: updateUsuarioDto.celular,
      ci_cedula: updateUsuarioDto.ci_ruc,
    };

    await this.usuarioRepository.update(id, usuarioUpdate);

    return {
      message: 'Perfil de usuario actualizado correctamente',
    };
  }
}
