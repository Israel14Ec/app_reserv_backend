import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfesionaleDto } from './dto/create-profesionale.dto';
import { UpdateProfesionaleDto } from './dto/update-profesionale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profesional } from './entities/profesionale.entity';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class ProfesionalesService {
  constructor(
    @InjectRepository(Profesional)
    private readonly profesionalRepository: Repository<Profesional>,
    private readonly usuarioService: UsuariosService,
  ) {}

  async create({
    name,
    email,
    password,
    celular,
    descripcion,
  }: CreateProfesionaleDto) {
    const newUser = await this.usuarioService.create({
      name,
      email,
      password,
      celular,
    });

    const profesional = await this.profesionalRepository.save({
      descripcion,
      usuario: { id: newUser.data.id }, // Se asigna solo la referencia al usuario creado
    });

    return {
      message: 'Cuenta de profesional creado correctamente',
      data: {
        profesional,
        usuario: newUser.data,
      },
    };
  }

  async profesionalByUserId(id: number) {
    const profesional = await this.profesionalRepository.findOne({
      where: { usuario: { id } },
    });

    if (!profesional) {
      throw new NotFoundException(
        'No se encontro un profesional con ese ID de usuario',
      );
    }

    return profesional;
  }

  async profesionalById(id: number) {
    const profesional = await this.profesionalRepository.findOneBy({ id });

    if (!profesional) {
      throw new NotFoundException('No se encontro un profesional con ese ID');
    }

    return profesional;
  }

  async update(id: number, updateProfesionaleDto: UpdateProfesionaleDto) {
    const { name, email, password, celular, ...rest } = updateProfesionaleDto;
    const profesional = await this.profesionalById(id);

    // Actualizar usuario
    await this.usuarioService.update(profesional.usuario.id, {
      name,
      celular,
    });

    // Actualizar profesional
    Object.assign(profesional, rest);
    const updatedProfesional =
      await this.profesionalRepository.save(profesional);

    return {
      message: 'Profesional actualizado correctamente',
      data: {
        profesional: updatedProfesional,
        usuario: updatedProfesional.usuario,
      },
    };
  }
}
