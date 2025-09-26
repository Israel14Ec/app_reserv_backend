import { Module } from '@nestjs/common';
import { ProfesionalesService } from './profesionales.service';
import { ProfesionalesController } from './profesionales.controller';
import { Profesional } from './entities/profesionale.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profesional]),
    UsuariosModule
  ],
  controllers: [ProfesionalesController],
  providers: [ProfesionalesService],
  exports: [
    ProfesionalesService
  ]
})
export class ProfesionalesModule {}
