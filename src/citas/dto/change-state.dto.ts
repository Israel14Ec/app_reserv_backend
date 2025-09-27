import { IsEnum, IsNotEmpty } from "class-validator";
import { EstadoCita } from "../entities/cita.entity";

export class ChangeStateDto {

    @IsNotEmpty({message: "Ingrese el estado"})
    @IsEnum(EstadoCita, { message: "Estado no válido"})
    estado: EstadoCita
}