import { IsNotEmpty } from "class-validator";

export class ResetPasswordDto {

    @IsNotEmpty({message: "Ingrese la nueva contraseña"})
    password: string;


}