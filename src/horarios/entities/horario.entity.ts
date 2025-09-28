import { Cita } from 'src/citas/entities/cita.entity';
import { Profesional } from 'src/profesionales/entities/profesionale.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

export enum DiasSemana {
    LUNES = 'lunes',
    MARTES = 'martes',
    MIERCOLES = 'miercoles',
    JUEVES = 'jueves',
    VIERNES = 'viernes',
    SABADO = 'sabado',
    DOMINGO = 'domingo',
}

@Entity()
export class Horario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: DiasSemana,
    })
    dia_atencion: DiasSemana;

    @Column({
        type: 'time',
    })
    hora_inicio: string;

    @Column({
        type: 'time',
    })
    hora_fin: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    //Relación 1 a N con profesionales
    @ManyToOne(() => Profesional, (profesional) => profesional.horarios)
    @JoinColumn({ name: 'id_profesional' })
    profesional: Profesional;

    //Relación 1 a N con citas
    @OneToMany(() => Cita, (cita) => cita.horario)
    citas: Cita[];
}
