import { IsEnum, IsOptional } from "class-validator";
import { EstadoCita } from "../entities/cita.entity";

export class FindAllDto {

    @IsOptional()
    id_profesional?: string;

    @IsOptional()
    id_paciente?: string;

    @IsOptional()
    @IsEnum(EstadoCita, {message: 'Estado no válido'})
    estado?: EstadoCita
}