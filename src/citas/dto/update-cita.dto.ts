import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class UpdateCitaDto {

    @IsNotEmpty({ message: "La fecha de la cita es obligatoria" })
    fecha_cita: string;

    @IsNotEmpty({ message: "El ID del profesional es obligatorio" })
    @IsNumber()
    id_profesional: number;

    @IsOptional()
    @IsString({message: "Ingrese un string"})
    nota?: string

    @IsNotEmpty({ message: "El ID del horario es obligatorio" })
    @IsNumber()
    id_horario: number;

    @IsNotEmpty({ message: "El ID del profesional es obligatorio" })
    @IsNumber()
    id_servicio: number;
}
