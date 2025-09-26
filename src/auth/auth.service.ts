import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { EmailsService } from 'src/emails/emails.service';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Repository } from 'typeorm';
import { IniciarSesionDto } from './dto/iniciar-sesion.dto';
import { RecuperarPasswordDto } from './dto/recuperar-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailsService,
  ) {}

  //Iniciar sesión
  async signIn({ email, password }: IniciarSesionDto) {
    //Buscar usuario x email
    const user = await this.usuarioRepository.findOneBy({ email });

    if (!user) {
      throw new NotFoundException({ message: 'Usuario no encontrado' });
    }

    //Comparar passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException({
        message: 'Contraseña incorrecta',
      });
    }

    const payload = { user_id: user.id };

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }

  //Enviar email para recuperar contraseña
  async recuperarPassword({ email }: RecuperarPasswordDto) {
    //Buscar usuario x email
    const user = await this.usuarioRepository.findOneBy({ email });

    if (!user) {
      throw new NotFoundException({ message: 'Usuario no encontrado' });
    }

    //Crear token
    const token = randomBytes(32).toString('hex');

    //Guardar en la DB
    user.reset_token = token;
    await this.usuarioRepository.save(user);

    //Enviar email con el token
    const url = `${process.env.FRONT_URL}/${token}`;
    this.emailService.enviarEmailRecuperCuenta(user.nombre, user.email, url);

    return {
      message: 'Se ha enviado un email para recuperar su contraseña',
    };
  }

  //Cambiar contraseña
  async cambiarPassword(token: string, { password }: ResetPasswordDto) {
    //Buscar usuario por el token
    const user = await this.usuarioRepository.findOneBy({ reset_token: token });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    //Reestablecer password
    const hashPassword = await bcrypt.hash(password, +process.env.SALT!);
    user.password = hashPassword;
    user.reset_token = null;
    await this.usuarioRepository.save(user);

    return {
      message: 'Contraseña reestablecida correctamente',
    };
  }

  // Obtener usuario por el token
  async getUserFromToken(token: string): Promise<Usuario> {
    try {
      const { user_id } = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET_JWT,
      });

      const user = await this.usuarioRepository.findOneBy({ id: user_id });

      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}
