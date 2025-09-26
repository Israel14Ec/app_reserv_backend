import { Body, Controller, Get, Param, Patch, Post, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IniciarSesionDto } from './dto/iniciar-sesion.dto';
import { RecuperarPasswordDto } from './dto/recuperar-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() iniciarSesion: IniciarSesionDto) {
    return this.authService.signIn(iniciarSesion);
  }

  @Post('recuperar-cuenta')
  recoverPasswordEmail(@Body() email: RecuperarPasswordDto) {
    return this.authService.recuperarPassword(email);
  }

  @Patch('reset-password/:id')
  resetPassword(
    @Param('id',) token: string,
    @Body() query: ResetPasswordDto) {
    return this.authService.cambiarPassword(token, query)
  }

  @Get('obtener-usuario-token')
  async getUserFromToken(@Req() req: Request) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('No se envió el token');
    }

    const [_, token] = authHeader.split(' ');
    
    // Llamar al servicio para obtener el usuario desde el token
    return this.authService.getUserFromToken(token);
  }
}
