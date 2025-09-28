import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HorariosService } from 'src/horarios/horarios.service';
import { PacientesService } from 'src/pacientes/pacientes.service';
import { ProfesionalesService } from 'src/profesionales/profesionales.service';
import { ServiciosService } from 'src/servicios/servicios.service';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateCitaDto } from './dto/create-cita.dto';
import { FindAllDto } from './dto/find-all.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';
import { Cita } from './entities/cita.entity';
import { ChangeStateDto } from './dto/change-state.dto';

@Injectable()
export class CitasService {
  constructor(
    @InjectRepository(Cita)
    private readonly citaRepository: Repository<Cita>,
    private readonly pacienteService: PacientesService,
    private readonly profesionalService: ProfesionalesService,
    private readonly servicioService: ServiciosService,
    private readonly horarioService: HorariosService,
  ) {}

  async create(createCitaDto: CreateCitaDto) {
    //Buscar paciente
    const paciente = await this.pacienteService.pacienteById(
      createCitaDto.id_paciente,
    );

    //Buscar profesional
    const profesional = await this.profesionalService.profesionalById(
      createCitaDto.id_profesional,
    );

    //Buscar servicio
    const servicio = await this.servicioService.findOne(
      createCitaDto.id_servicio,
    );

    //Buscar horario
    const horario = await this.horarioService.findOneByProfesionalAndHorarioId(
      createCitaDto.id_profesional,
      createCitaDto.id_horario,
    );

    //validar que la cita esté disponible en la fecha en ese horario para ese profesional
    const existeCita = await this.citaRepository.exists({
      where: {
        fecha_cita: createCitaDto.fecha_cita,
        horario: { id: createCitaDto.id_horario },
        profesional: { id: createCitaDto.id_profesional },
      },
    });

    if (existeCita) {
      throw new ConflictException(
        'La cita no está disponible en la fecha y horario seleccionado',
      );
    }

    const ultimaCita = await this.citaRepository.findOne({
      where: { paciente: { id: paciente.id } },
      order: { id: 'DESC' }, // o fecha_cita DESC si quieres por fecha
    });

    let numeroCita = 1; // por defecto si no tiene citas previas

    if (ultimaCita && ultimaCita.numero_cita) {
      // Convertir a número, quitar ceros a la izquierda
      numeroCita = parseInt(ultimaCita.numero_cita, 10) + 1;
    }

    // Formatear con ceros a la izquierda (9 dígitos)
    const numeroCitaFormateado = numeroCita.toString().padStart(9, '0');

    const cita = await this.citaRepository.save({
      numero_cita: `${numeroCitaFormateado}`,
      fecha_cita: createCitaDto.fecha_cita,
      paciente: paciente,
      profesional: profesional,
      servicio: servicio,
      horario: horario,
      nota: createCitaDto.nota,
    });

    return {
      message: 'Cita creada exitosamente',
      cita: cita,
    };
  }

  //Buscar citas (como parámetros se pasa el id_profesional e id_paciente y estado)
  async findAll(findAllDto: FindAllDto) {
    const { id_paciente, id_profesional, estado } = findAllDto;

    // Construir el filtro dinámicamente con tipado seguro
    const where: FindOptionsWhere<Cita> = {};

    if (id_profesional) {
      where.profesional = { id: +id_profesional };
    }

    if (id_paciente) {
      where.paciente = { id: +id_paciente };
    }

    if (estado) {
      where.estado = estado;
    }

    const citas = await this.citaRepository.find({
      where,
      order: {
        updatedAt: 'DESC',
      },
      relations: {
        horario: true,
        servicio: true,
        profesional: {
          usuario: true,
        },
        paciente: {
          usuario: true,
        },
      },
    });

    return citas;
  }

  async findOne(id: number) {
    const cita = await this.citaRepository.findOne({
      where: {
        id,
      },
      relations: {
        horario: true,
        servicio: true,
        profesional: {
          usuario: true,
        },
        paciente: {
          usuario: true,
        },
      },
    });
    if (!cita) {
      throw new NotFoundException('No se enctró la cita con ese id');
    }
    return cita;
  }

  async update(id: number, updateCitaDto: UpdateCitaDto) {
    const cita = await this.findOne(id);

    //Buscar profesional
    const profesional = await this.profesionalService.profesionalById(
      updateCitaDto.id_profesional,
    );

    //Buscar servicio
    const servicio = await this.servicioService.findOne(
      updateCitaDto.id_servicio,
    );

    //Buscar horario
    const horario = await this.horarioService.findOneByProfesionalAndHorarioId(
      updateCitaDto.id_profesional,
      updateCitaDto.id_horario,
    );

    // Validar que la cita esté disponible en la fecha, horario y profesional
    const existeCita = await this.citaRepository
      .createQueryBuilder('cita')
      .where('cita.fecha_cita = :fecha', { fecha: updateCitaDto.fecha_cita })
      .andWhere('cita.id_horario = :id_horario', {
        id_horario: updateCitaDto.id_horario,
      })
      .andWhere('cita.id_profesional = :id_profesional', {
        id_profesional: updateCitaDto.id_profesional,
      })
      .andWhere('cita.id != :id', { id })
      .getExists();

    if (existeCita) {
      throw new ConflictException(
        'La cita no está disponible en la fecha y horario seleccionado',
      );
    }

    const citaUpdate = await this.citaRepository.save({
      numero_cita: cita?.numero_cita,
      fecha_cita: updateCitaDto.fecha_cita,
      profesional: profesional,
      servicio: servicio,
      horario: horario,
      nota: updateCitaDto.nota,
    });

    return {
      message: 'Cita actualizada correctamente',
      data: citaUpdate,
    };
  }

  //Cambiar de estado
  async changeState(id: number, changeStateDto: ChangeStateDto) {
    const cita = await this.findOne(id);
    cita.estado = changeStateDto.estado;
    await this.citaRepository.save(cita);

    return {
      message: 'Estado de la cita actualizada',
    };
  }

  async remove(id: number) {
    const cita = await this.findOne(id);
    await this.citaRepository.remove(cita);

    return {
      data: cita,
      message: 'Cita eliminada',
    };
  }
}
