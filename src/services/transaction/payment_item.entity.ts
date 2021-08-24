import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from "typeorm";
import { Transaction } from "./transaction.entity";

@Entity()
export class PaymentItem{
    @PrimaryGeneratedColumn({type:"int"})
    item_id: number;

    @Column({type: "varchar", length: 100})
    item_name: string;

    @OneToMany(()=> Transaction, transaction => transaction.payment_item)
    transactions: Transaction[];
}