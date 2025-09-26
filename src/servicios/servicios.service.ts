import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Servicio } from './entities/servicio.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServiciosService {

  constructor(
    @InjectRepository(Servicio)
    private readonly servicioRepository: Repository<Servicio>
  ){}

  async create(createServicioDto: CreateServicioDto) {
    const nuevoServicio = await this.servicioRepository.save(createServicioDto);
    return {
      message: "Servicio creado correctamente",
      data: nuevoServicio
    };
  }

  async findAll() {
    return this.servicioRepository.find();
  }

  async findOne(id: number) {
    const servicio = await this.servicioRepository.findOneBy({id});

    if(!servicio) {
      throw new NotFoundException(`El servicio con id ${id} no existe`);
    }

    return servicio;
  }

  async update(id: number, updateServicioDto: UpdateServicioDto) {
    const servicio = await this.findOne(id);

    Object.assign(servicio, updateServicioDto);
    
    const servicioActualizado = this.servicioRepository.save(servicio);
    return {
      message: "Servicio actualizado correctamente",
      data: servicioActualizado
    }
  }

  async remove(id: number) {
    const servicio = await this.findOne(id);
    await this.servicioRepository.remove(servicio);
    return {
      message: "Servicio eliminado correctamente",
      data: servicio
    }
  }
}
