import { Entity, Column, PrimaryGeneratedColumn, OneToMany, DeleteDateColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Transaction } from "../transaction/transaction.entity";

@Entity()
export class QuickUser{
    @PrimaryGeneratedColumn({type: "int"})
    user_id: number;

    @Column({type: "varchar", length: 100})
    email_address: string;

    @Column({type: "varchar", length: 20})
    phone_number: string;

    @CreateDateColumn()
    created_at: any;

    @UpdateDateColumn()
    updated_at: any;

    @DeleteDateColumn()
    deleted_at: any;

    @OneToMany(() => Transaction, transaction=>transaction.user)
    transactions: Transaction[];

}