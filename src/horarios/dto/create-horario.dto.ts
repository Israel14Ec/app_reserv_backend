import {
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsString
} from 'class-validator';
import { DiasSemana } from '../entities/horario.entity';


export class CreateHorarioDto {

    @IsEnum(DiasSemana)
    dia_atencion: DiasSemana;

    @IsNotEmpty({message: "Hora de inicio es obligatoria"})
    @IsString()
    hora_inicio: string;

    @IsNotEmpty({message: "Hora de fin es obligatoria"})
    @IsString()
    hora_fin: string;

    @IsNotEmpty({message: "ID del profesional es obligatorio"})
    @IsNumber()
    id_profesional: number;
}
