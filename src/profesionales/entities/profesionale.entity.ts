import { Cita } from 'src/citas/entities/cita.entity';
import { Horario } from 'src/horarios/entities/horario.entity';
import { Servicio } from 'src/servicios/entities/servicio.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Profesional {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 250 })
  descripcion: string;

  //Relación con usuarios 1 a 1
  @OneToOne(() => Usuario, (usuario) => usuario.id)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  // Relación 1 a N con servicios
  @OneToMany(() => Servicio, (servicio) => servicio.profesional)
  servicios: Servicio[];

  //Relación 1 a N con horarios
  @OneToMany(() => Horario, (horario) => horario.profesional)
  horarios: Horario[];

  //Relación 1 a N con citas
  @OneToMany(() => Cita, (cita) => cita.profesional)
  citas: Cita[];
}
