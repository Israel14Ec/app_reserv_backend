import { Paciente } from "src/pacientes/entities/paciente.entity";
import { Profesional } from "src/profesionales/entities/profesionale.entity";
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 250})
    nombre: string;
    
    @Column({type: 'varchar', length: 250})
    email: string;

    @Column({type: 'varchar', length: 250})
    password: string;

    @Column({type: 'varchar', length: 10, nullable: true})
    celular?: string;

    @Column({type: 'varchar', length: 13})
    ci_ruc: string;

    @Column({type: 'varchar', length: 100, nullable: true})
    reset_token?: string | null;
    
    @CreateDateColumn()
    createdAt: string;
    
    @UpdateDateColumn()
    updatedAt: string;

    //Inversa de la relacion 1 a 1 con profesional
    @OneToOne(() => Profesional, profesional => profesional.usuario)
    prefesional: Profesional;

    //Inversa de la relacion 1 a 1 con paciente
    @OneToOne(() =>Profesional, profesional => profesional.usuario)
    paciente: Paciente;
}
