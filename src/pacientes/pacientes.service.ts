import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Paciente } from './entities/paciente.entity';
import { Repository } from 'typeorm';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class PacientesService {
  constructor(
    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,
    private readonly usuarioService: UsuariosService,
  ) {}

  async create(createPacienteDto: CreatePacienteDto) {
    const { name, email, password, celular, ci_ruc, ...rest } = createPacienteDto;
    const newUser = await this.usuarioService.create({
      name,
      email,
      password,
      celular,
      ci_ruc
    });

    const paciente = await this.pacienteRepository.save({
      ...rest,
      usuario: { id: newUser.data.id },
    });

    return {
      message: 'Cuenta de paciente creado correctamente',
      data: {
        paciente,
        usuario: newUser.data,
      },
    };
  }

  async pacienteByUserId(id: number) {
    const paciente = await this.pacienteRepository.findOne({
      where: { usuario: { id } },
    });
    return paciente;
  }

  async getAllPaciente () {
    return this.pacienteRepository.find({
      relations: {
        usuario: true
      }
    })
  }

  async pacienteById(id: number) {
    const paciente = await this.pacienteRepository.findOneBy({ id });

    if (!paciente) {
      throw new NotFoundException('No se encontro un paciente con ese ID');
    }
    return paciente;
  }

  async update(id: number, updatePacienteDto: UpdatePacienteDto) {
    const { name, celular, ...rest } = updatePacienteDto;
    const paciente = await this.pacienteById(id);

    // Actualizar usuario
    await this.usuarioService.update(paciente.usuario.id, {
      name,
      celular,
    });

    // Actualizar paciente
    Object.assign(paciente, rest);
    const updatedProfesional = await this.pacienteRepository.save(paciente);

    return {
      message: 'Paciente actualizado correctamente',
      data: {
        profesional: updatedProfesional,
        usuario: updatedProfesional.usuario,
      },
    };
  }
}
