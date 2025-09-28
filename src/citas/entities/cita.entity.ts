import { Horario } from "src/horarios/entities/horario.entity";
import { Paciente } from "src/pacientes/entities/paciente.entity";
import { Profesional } from "src/profesionales/entities/profesionale.entity";
import { Servicio } from "src/servicios/entities/servicio.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum EstadoCita {
    PENDIENTE = 'pendiente',
    CONFIRMADA = 'confirmada',
    CANCELADA = 'cancelada',
    COMPLETADA = 'finalizada',
    CANCELADA_CLIENTE="cancelada_cliente"
}

@Entity()
export class Cita {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 64})
    numero_cita: string

    @Column({type: 'enum', enum: EstadoCita, default: EstadoCita.PENDIENTE})
    estado: EstadoCita;

    @Column({type: 'date'})
    fecha_cita: string;

    @Column({type: 'varchar', length: 250, nullable: true})
    nota?: string

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    //Relacioón 1 a N con profesionales
    @ManyToOne(() => Profesional, (profesional) => profesional.citas)
    @JoinColumn({name: 'id_profesional'})
    profesional: Profesional;

    //Relación 1 a N con usuarios (clientes)
    @ManyToOne(() => Paciente, (paciente) => paciente.citas)
    @JoinColumn({name: 'id_paciente'})
    paciente: Paciente;

    //Relación N a 1 con servicios
    @ManyToOne(() => Servicio, (servicio) => servicio.citas)
    @JoinColumn({name: 'id_servicio'})
    servicio: Servicio;

    //Relación 1 a N con horario
    @ManyToOne(() => Horario, (horario) => horario.citas)
    @JoinColumn({name: 'id_horario'})
    horario: Horario;
}
