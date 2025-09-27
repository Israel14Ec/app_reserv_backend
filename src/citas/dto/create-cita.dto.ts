import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCitaDto {
  @IsNotEmpty({ message: 'La fecha de la cita es obligatoria' })
  fecha_cita: string;

  @IsOptional()
  @IsString({ message: 'Ingrese un string' })
  nota?: string;

  @IsNotEmpty({ message: 'El ID del profesional es obligatorio' })
  @IsNumber()
  id_paciente: number;

  @IsNotEmpty({ message: 'El ID del profesional es obligatorio' })
  @IsNumber()
  id_profesional: number;

  @IsNotEmpty({ message: 'El ID del horario es obligatorio' })
  @IsNumber()
  id_horario: number;

  @IsNotEmpty({ message: 'El ID del profesional es obligatorio' })
  @IsNumber()
  id_servicio: number;
}
