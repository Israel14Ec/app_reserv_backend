import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CitasService } from './citas.service';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';
import { FindAllDto } from './dto/find-all.dto';
import { ChangeStateDto } from './dto/change-state.dto';

@Controller('api/v1/citas')
export class CitasController {
  constructor(private readonly citasService: CitasService) {}

  @Post()
  create(@Body() createCitaDto: CreateCitaDto) {
    return this.citasService.create(createCitaDto);
  }

  @Get()
  findAll(@Query() findAllDto : FindAllDto ) {
    return this.citasService.findAll(findAllDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.citasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCitaDto: UpdateCitaDto) {
    return this.citasService.update(+id, updateCitaDto);
  }

  @Patch('update-estado/:id')
  changeStatus(@Param('id') id: string, @Body() changeState : ChangeStateDto) {
    return this.citasService.changeState(+id, changeState)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.citasService.remove(+id);
  }
}
