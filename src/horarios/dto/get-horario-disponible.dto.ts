import { IsNotEmpty } from "class-validator";

export class GetHorarioDisponibleDto{

    @IsNotEmpty({message: "No se mando el id profesional"})
    idProfesional: string;

    @IsNotEmpty({message: "No se mando la fecha"})
    fecha: string
}