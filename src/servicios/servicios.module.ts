import { Module } from '@nestjs/common';
import { ServiciosService } from './servicios.service';
import { ServiciosController } from './servicios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Servicio } from './entities/servicio.entity';
import { ProfesionalesModule } from 'src/profesionales/profesionales.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Servicio]),
    ProfesionalesModule
  ],
  controllers: [ServiciosController],
  providers: [ServiciosService],
  exports: [ServiciosService]
})
export class ServiciosModule {}
