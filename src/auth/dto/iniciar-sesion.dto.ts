import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class IniciarSesionDto {
  @IsNotEmpty({ message: 'Ingrese un correo' })
  @IsEmail({}, { message: 'Ingrese un correo válido' })
  email: string;

  @IsNotEmpty({ message: 'Ingrese una contraseña' })
  @IsString({ message: 'Ingrese una contraseña válida' })
  password: string;
}
