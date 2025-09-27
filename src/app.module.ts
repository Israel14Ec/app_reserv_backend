import { Module } from '@nestjs/common';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiciosModule } from './servicios/servicios.module';
import { ProfesionalesModule } from './profesionales/profesionales.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { EmailsModule } from './emails/emails.module';
import { PacientesModule } from './pacientes/pacientes.module';
import { HorariosModule } from './horarios/horarios.module';
import { CitasModule } from './citas/citas.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +(process.env.DB_PORT || 3306),
      username: process.env.DB_USER,
      password: process.env.DB_PASS || "",
      database: process.env.DB_NAME,
      synchronize: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
    UsuariosModule,
    ServiciosModule,
    ProfesionalesModule,
    AuthModule,
    EmailsModule,
    PacientesModule,
    HorariosModule,
    CitasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
