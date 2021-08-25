import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, DeleteDateColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Campus } from "./campus.entity";
import { Transaction } from "../transaction/transaction.entity";

@Entity()
export class User{
    @PrimaryGeneratedColumn({
        type: "int",
    })
    user_id: number;

    @Column({type: "varchar", length: 50})
    first_name: string;

    @Column({type: "varchar", length: 50})
    last_name: string;

    @Column({type: "varchar", length: 100})
    email_address: string;

    @Column({type: "varchar", length: 20})
    phone_number: string;

    @Column({type: "boolean"})
    is_member: boolean;

    @ManyToOne(() => Campus, campus => campus.users)
    campus: Campus;

    @Column({type: "varchar", length:200, default:"uonsda"})
    local_church: string;

    @OneToMany(() => Transaction, transaction=>transaction.user)
    transactions: Transaction[];

    @CreateDateColumn()
    created_at: any;

    @UpdateDateColumn()
    updated_at: any;

    @DeleteDateColumn()
    deleted_at: any;

}