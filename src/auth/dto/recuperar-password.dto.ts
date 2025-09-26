import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RecuperarPasswordDto {
  @IsNotEmpty({ message: 'Ingrese un correo' })
  @IsEmail({}, { message: 'Ingrese un correo válido' })
  email: string;

}
