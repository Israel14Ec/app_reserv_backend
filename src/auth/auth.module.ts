import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailsModule } from 'src/emails/emails.module';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ProfesionalesModule } from 'src/profesionales/profesionales.module';
import { PacientesModule } from 'src/pacientes/pacientes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]),
    EmailsModule,
    ProfesionalesModule,
    PacientesModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
