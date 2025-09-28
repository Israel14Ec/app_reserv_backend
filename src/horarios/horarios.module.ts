import { Module } from '@nestjs/common';
import { HorariosService } from './horarios.service';
import { HorariosController } from './horarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Horario } from './entities/horario.entity';
import { ProfesionalesModule } from 'src/profesionales/profesionales.module';
import { Cita } from 'src/citas/entities/cita.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Horario, Cita]),
    ProfesionalesModule
  ],
  controllers: [HorariosController],
  providers: [HorariosService],
  exports: [HorariosService]
})
export class HorariosModule {}
