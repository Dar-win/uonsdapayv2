import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Campus{
    @PrimaryGeneratedColumn({type:"int"})
    campus_id: number;

    @Column({type: "varchar", length: 100})
    campus_name: string;

    @OneToMany(()=>User, user => user.campus)
    users: User[]
}