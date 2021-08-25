import { PrimaryGeneratedColumn, Column, Entity, OneToMany, DeleteDateColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Transaction } from "./transaction.entity";

@Entity()
export class PaymentItem{
    @PrimaryGeneratedColumn({type:"int"})
    item_id: number;

    @Column({type: "varchar", length: 100})
    item_name: string;

    @OneToMany(()=> Transaction, transaction => transaction.payment_item)
    transactions: Transaction[];

    @CreateDateColumn()
    created_at: any;

    @UpdateDateColumn()
    updated_at: any;

    @DeleteDateColumn()
    deleted_at: any;
}