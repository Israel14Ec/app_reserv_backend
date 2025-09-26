import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateProfesionaleDto } from './dto/create-profesionale.dto';
import { UpdateProfesionaleDto } from './dto/update-profesionale.dto';
import { ProfesionalesService } from './profesionales.service';

@Controller('api/v1/profesionales')
export class ProfesionalesController {
  constructor(private readonly profesionalesService: ProfesionalesService) {}

  @Post()
  create(@Body() createProfesionaleDto: CreateProfesionaleDto) {
    return this.profesionalesService.create(createProfesionaleDto);
  }

  @Get('by-user/:id')
  profesionalByUserId(@Param('id') id: string) {
    return this.profesionalesService.profesionalByUserId(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfesionaleDto: UpdateProfesionaleDto) {
    return this.profesionalesService.update(+id, updateProfesionaleDto);
  }
}
