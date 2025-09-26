import { Profesional } from 'src/profesionales/entities/profesionale.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Servicio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 250 })
  nombre: string;

  @Column({ type: 'varchar', length: 250 })
  descripcion: string;
  
  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  deletedAt: string;

  // Relación N a 1 con profesional
  @ManyToOne(() => Profesional, (profesional) => profesional.servicios)
  @JoinColumn({ name: 'id_profesional' })
  profesional: Profesional;
}
