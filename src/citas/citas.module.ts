import { Module } from '@nestjs/common';
import { CitasService } from './citas.service';
import { CitasController } from './citas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cita } from './entities/cita.entity';
import { PacientesModule } from 'src/pacientes/pacientes.module';
import { ProfesionalesModule } from 'src/profesionales/profesionales.module';
import { ServiciosModule } from 'src/servicios/servicios.module';
import { Horario } from 'src/horarios/entities/horario.entity';
import { HorariosModule } from 'src/horarios/horarios.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cita]),
    PacientesModule,
    ProfesionalesModule,
    ServiciosModule,
    HorariosModule
  ],
  controllers: [CitasController],
  providers: [CitasService],
})
export class CitasModule {}
