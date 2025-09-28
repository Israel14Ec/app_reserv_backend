import { IsNotEmpty, IsOptional, IsString, Matches, MaxLength } from "class-validator";

export class CreateUsuarioDto {

    @IsNotEmpty({message: "El nombre es obligatorio"})
    @IsString({message: "El nombre debe ser un string"})
    @MaxLength(250, {message: "El nombre no debe superar los 250 caracteres"})
    name: string;

    @IsNotEmpty({message: "El email es obligatorio"})
    @IsString({message: "El email debe ser un string"})
    @MaxLength(250, {message: "El email no debe superar los 250 caracteres"})
    email: string;

    @IsNotEmpty({message: "El password es obligatorio"})
    @IsString({message: "El password debe ser un string"})
    @MaxLength(250, {message: "El password no debe superar los 250 caracteres"})
    password: string;

    @IsOptional()
    celular?: string;

    @IsNotEmpty({message: "Ingrese el ruc o ci"})
    @Matches(/^\d{10}$|^\d{13}$/, {message: 'La cédula debe tener 10 dígitos o el RUC 13 dígitos',})
    ci_ruc: string;
}
