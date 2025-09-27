import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HorariosService } from './horarios.service';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';

@Controller('api/v1/horarios')
export class HorariosController {
  constructor(private readonly horariosService: HorariosService) {}

  @Post()
  create(@Body() createHorarioDto: CreateHorarioDto) {
    return this.horariosService.create(createHorarioDto);
  }

  @Get('find-by-profesional/:idProfesional')
  findAll(@Param('idProfesional') idProfesional: string) {
    return this.horariosService.findAllByProfesional(+idProfesional);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.horariosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHorarioDto: UpdateHorarioDto) {
    return this.horariosService.update(+id, updateHorarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.horariosService.remove(+id);
  }
}
