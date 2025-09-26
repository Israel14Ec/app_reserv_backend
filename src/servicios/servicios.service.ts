import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Servicio } from './entities/servicio.entity';
import { Repository } from 'typeorm';
import { ProfesionalesService } from 'src/profesionales/profesionales.service';

@Injectable()
export class ServiciosService {
  constructor(
    @InjectRepository(Servicio)
    private readonly servicioRepository: Repository<Servicio>,
    private readonly profesionalesService: ProfesionalesService,
  ) {}

  async create(createServicioDto: CreateServicioDto) {
    // Verificar que el profesional exista
    const profesional = await this.profesionalesService.profesionalById(
      createServicioDto.id_profesional,
    );

    const nuevoServicio = await this.servicioRepository.save({
      ...createServicioDto,
      profesional: { id: profesional.id },
    });

    return {
      message: 'Servicio creado correctamente',
      data: nuevoServicio,
    };
  }

  async findAllByProfesional(id_profesional: number) {
    return this.servicioRepository.findBy({profesional: {id: id_profesional}});
  }

  async findOne(id: number) {
    const servicio = await this.servicioRepository.findOneBy({ id });

    if (!servicio) {
      throw new NotFoundException(`El servicio con id ${id} no existe`);
    }

    return servicio;
  }

  async update(id: number, updateServicioDto: UpdateServicioDto) {
    const servicio = await this.findOne(id);

    Object.assign(servicio, updateServicioDto);

    const servicioActualizado = this.servicioRepository.save(servicio);
    return {
      message: 'Servicio actualizado correctamente',
      data: servicioActualizado,
    };
  }

  async remove(id: number) {
    const servicio = await this.findOne(id);
    await this.servicioRepository.remove(servicio);
    return {
      message: 'Servicio eliminado correctamente',
      data: servicio,
    };
  }
}
