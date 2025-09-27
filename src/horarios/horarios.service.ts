import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfesionalesService } from 'src/profesionales/profesionales.service';
import { Repository } from 'typeorm';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';
import { Horario } from './entities/horario.entity';

@Injectable()
export class HorariosService {
  constructor(
    @InjectRepository(Horario)
    private readonly horarioRepository: Repository<Horario>,
    private readonly profesionalService: ProfesionalesService,
  ) {}

  async create(createHorarioDto: CreateHorarioDto) {
    // 1. Buscar profesional por id
    const profesional = await this.profesionalService.profesionalById(
      createHorarioDto.id_profesional,
    );

    // 2. Verificar si existe un horario que se superponga
    const existeHorario = await this.horarioRepository
      .createQueryBuilder('horario')
      .where('horario.id_profesional = :idProfesional', {
        idProfesional: profesional.id,
      })
      .andWhere('horario.dia_atencion = :dia', {
        dia: createHorarioDto.dia_atencion, // si usas enum (un solo día)
      })
      .andWhere('horario.hora_inicio < :horaFin', {
        horaFin: createHorarioDto.hora_fin,
      })
      .andWhere('horario.hora_fin > :horaInicio', {
        horaInicio: createHorarioDto.hora_inicio,
      })
      .getOne();

    if (existeHorario) {
      throw new ConflictException(
        `Ya tiene un horario creado en esas horas y ese dia`,
      );
    }

    // 3. Guardar horario nuevo
    const nuevoHorario = this.horarioRepository.create({
      dia_atencion: createHorarioDto.dia_atencion, // si usas enum simple
      hora_inicio: createHorarioDto.hora_inicio,
      hora_fin: createHorarioDto.hora_fin,
      profesional,
    });

    await this.horarioRepository.save(nuevoHorario);

    return {
      message: 'Horario creado correctamente',
      data: nuevoHorario,
    };
  }

  async findAllByProfesional(idProfesional: number) {
    const horario = await this.horarioRepository.findBy({
      profesional: { id: idProfesional },
    });

    if (!horario) {
      throw new NotFoundException(
        'No se encontraron horarios para este profesional',
      );
    }

    return horario;
  }

  async findOne(id: number) {
    const horario = await this.horarioRepository.findOne({
      where: { id },
      relations: ['profesional'],
    });
    if (!horario) {
      throw new NotFoundException('Horario no encontrado');
    }
    return horario;
  }

  //Buscar horario por profesional e id
  async findOneByProfesionalAndHorarioId(id_profesional : number, id_horario: number) {
    const horario = await this.horarioRepository.findOne({
      where: {
        id: id_horario,
        profesional: {id: id_profesional}
      }
    })

    if(!horario) {
      throw new NotFoundException("No se encontró el horario para ese profesional")
    }

    return horario

  }

  async update(id: number, updateHorarioDto: UpdateHorarioDto) {
    // 1. Obtener el horario actual
    const horario = await this.findOne(id);

    // 2. Verificar solapamiento con otros horarios del mismo profesional y día
    const existeHorario = await this.horarioRepository
      .createQueryBuilder('horario')
      .where('horario.id_profesional = :idProfesional', {
        idProfesional: horario.profesional.id,
      })
      .andWhere('horario.dia_atencion = :dia', {
        dia: updateHorarioDto.dia_atencion ?? horario.dia_atencion,
      })
      .andWhere('horario.id != :id', { id }) // ⚠️ Excluye el horario actual
      .andWhere('horario.hora_inicio < :horaFin', {
        horaFin: updateHorarioDto.hora_fin ?? horario.hora_fin,
      })
      .andWhere('horario.hora_fin > :horaInicio', {
        horaInicio: updateHorarioDto.hora_inicio ?? horario.hora_inicio,
      })
      .getOne();

    if (existeHorario) {
      throw new ConflictException(
        `El horario se superpone con otro horario existente para el mismo profesional`,
      );
    }

    // 3. Actualizar horario
    const horarioActualizado = Object.assign(horario, updateHorarioDto);
    const resultado = await this.horarioRepository.save(horarioActualizado);

    return {
      message: 'Horario actualizado correctamente',
      data: resultado,
    };
  }

  async remove(id: number) {
    const horario = await this.findOne(id);
    this.horarioRepository.remove(horario);
    return {
      message: 'Horario eliminado correctamente',
      data: horario,
    }
  }
}
