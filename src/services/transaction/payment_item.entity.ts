import { PrimaryGeneratedColumn, Column, Entity, OneToMany, DeleteDateColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Contribution } from "./contribution.entity";
import { PaymentTransaction } from "./transaction_payment.entity";

@Entity()
export class PaymentItem{
    @PrimaryGeneratedColumn({type:"int"})
    item_id: number;

    @Column({type: "varchar", length: 100})
    item_name: string;

    @Column({type: "boolean", default: false})
    is_contribution: boolean;

    @Column({type: "varchar", length: 20, default: "open"})
    status: string;

    @OneToMany(()=> PaymentTransaction, paymentTransaction => paymentTransaction.payment_item)
    transactions: PaymentTransaction[];

    @OneToMany(()=>Contribution, contribution => contribution.paymentItem)
    contributions: Contribution[]

    @CreateDateColumn()
    created_at: any;

    @UpdateDateColumn()
    updated_at: any;

    @DeleteDateColumn()
    deleted_at: any;
}