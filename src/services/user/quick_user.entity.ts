import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Transaction } from "../transaction/transaction.entity";

@Entity()
export class QuickUser{
    @PrimaryGeneratedColumn({type: "int"})
    user_id: number;

    @Column({type: "varchar", length: 100})
    email_address: string;

    @Column({type: "varchar", length: 20})
    phone_number: string;

    @OneToMany(() => Transaction, transaction=>transaction.user)
    transactions: Transaction[];

}