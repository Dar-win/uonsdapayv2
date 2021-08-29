import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, DeleteDateColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { PaymentItem } from "./payment_item.entity";
import { User } from "../user/user.entity";
import { QuickUser } from "../user/quick_user.entity";

@Entity()
export class PaymentTransaction{
    @PrimaryGeneratedColumn({type: "int", })
    transaction_id: number;

    @ManyToOne(() => User, user => user.payment_transactions, {nullable:true})
    user: User;

    @ManyToOne(() => QuickUser, quickUser => quickUser.payment_transactions, {nullable:true})
    quickUser: QuickUser;

    @Column({type: "boolean"})
    is_campus_payment: boolean;

    @ManyToOne(type=> PaymentItem, paymentItem => paymentItem.transactions)
    payment_item: PaymentItem;

    @Column({type: "varchar", length: 100})
    receipt_number: string;

    @Column({type: "varchar", length: 50})
    phone_number: string;

    @Column({type: "int"})
    amount: number;

    @Column({type: "varchar", length: 50})
    transaction_date: string;


    @CreateDateColumn()
    created_at: any;

    @UpdateDateColumn()
    updated_at: any;

    @DeleteDateColumn()
    deleted_at: any;
}