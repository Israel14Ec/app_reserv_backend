import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUsuarioDto } from 'src/usuarios/dto/create-usuario.dto';

export class CreateProfesionaleDto extends CreateUsuarioDto {
    
  @IsNotEmpty({ message: 'La descripción es obligatorio' })
  @IsString({ message: 'La descripción debe ser un string' })
  descripcion: string;
}
