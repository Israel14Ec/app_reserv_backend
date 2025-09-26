import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, MaxDate } from 'class-validator';
import { CreateUsuarioDto } from 'src/usuarios/dto/create-usuario.dto';

export class CreatePacienteDto extends CreateUsuarioDto {
  @IsNotEmpty({ message: 'La dirección es obligatoria' })
  @IsString({ message: 'La dirección debe ser un string' })
  direccion: string;

  @IsNotEmpty({ message: 'La fecha de nacimiento es obligatoria' })
  @Type(() => Date) // Convierte el string a Date automáticamente
  @MaxDate(new Date(), {
    message: 'Fecha de nacimiento no válida',
  })
  fecha_nacimiento: string;

  @IsOptional()
  nota_adicional?: string;
}
