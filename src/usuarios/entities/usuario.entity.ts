import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @Column({type: 'varchar', length: 100, nullable: true})
    reset_token?: string | null;
    
    @CreateDateColumn()
    createdAt: string;
    
    @UpdateDateColumn()
    updatedAt: string;


}
