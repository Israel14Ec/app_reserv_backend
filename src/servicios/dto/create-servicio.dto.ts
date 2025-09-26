import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  MaxLength
} from 'class-validator';

export class CreateServicioDto {
  @IsNotEmpty({ message: 'Ingrese el nombre del servicio' })
  @MaxLength(250, {
    message: 'El nombre del servicio debe tener máximo 250 caracteres',
  })
  nombre: string;

  @IsNotEmpty({ message: 'Ingrese el nombre del servicio' })
  @MaxLength(250, {
    message: 'El nombre del servicio debe tener máximo 250 caracteres',
  })
  descripcion: string;

  @IsNotEmpty({ message: 'El ID del profesional es obligatorio' })
  @IsInt({ message: 'El ID del profesional debe ser un número entero' })
  @Type(() => Number)
  id_profesional: number;
}
