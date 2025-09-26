import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Profesional {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 250})
    descripcion: string;

    //Relaciones

}
