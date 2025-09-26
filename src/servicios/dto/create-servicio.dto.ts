import { IsNotEmpty, IsNumber, IsNumberString, MaxLength, Min } from "class-validator";

export class CreateServicioDto {

    @IsNotEmpty({message: "Ingrese el nombre del servicio"})
    @MaxLength(250, {message: "El nombre del servicio debe tener máximo 250 caracteres"})
    nombre: string;

    @IsNotEmpty({message: "Ingrese el nombre del servicio"})
    @MaxLength(250, {message: "El nombre del servicio debe tener máximo 250 caracteres"})
    descripcion: string;

    @IsNotEmpty({ message: "Ingrese el precio del servicio" })
    @IsNumber({}, { message: "El precio debe ser un número" })
    @Min(0, { message: "El precio no puede ser negativo" })
    precio: number;
}