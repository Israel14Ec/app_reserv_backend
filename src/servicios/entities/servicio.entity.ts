import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Servicio {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 250})
    nombre: string;

    @Column({type: 'varchar', length: 250})
    descripcion: string;

    @Column({type: 'decimal', precision: 10, scale: 2})
    precio: number;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    deletedAt: string;
}
