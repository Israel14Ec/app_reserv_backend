import { Usuario } from 'src/usuarios/entities/usuario.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Paciente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 250 })
  direccion?: string;

  @Column({ type: 'date'})
  fecha_nacimiento: string;


  @Column({ type: 'varchar', length: 500, nullable: true })
  nota_adicional?: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  //Relación con usuarios 1 a 1
  @OneToOne(() => Usuario, (usuario) => usuario.id, { eager: true })
  @JoinColumn({ name: 'id_usuario'})
  usuario: Usuario;
}
