import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, DeleteDateColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { PaymentItem } from "./payment_item.entity";
import { User } from "../user/user.entity";
import { QuickUser } from "../user/quick_user.entity";
import { ObjectType, ID, Field, Int } from "type-graphql";

@ObjectType()
@Entity()
export class PaymentTransaction{
    @Field(()=>ID)
    @PrimaryGeneratedColumn({type: "int", })
    transaction_id: number;

    @Field(()=>User)
    @ManyToOne(() => User, user => user.payment_transactions, {nullable:true})
    user: User;

    @Field(()=>QuickUser)
    @ManyToOne(() => QuickUser, quickUser => quickUser.payment_transactions, {nullable:true})
    quickUser: QuickUser;

    @Field()
    @Column({type: "boolean"})
    is_campus_payment: boolean;

    @Field(()=>PaymentItem)
    @ManyToOne(type=> PaymentItem, paymentItem => paymentItem.transactions)
    payment_item: PaymentItem;

    @Field()
    @Column({type: "varchar", length: 100})
    receipt_number: string;

    @Field()
    @Column({type: "varchar", length: 50})
    phone_number: string;

    @Field(()=>Int)
    @Column({type: "int"})
    amount: number;

    @Field()
    @Column({type: "varchar", length: 50})
    transaction_date: string;

    @CreateDateColumn()
    created_at?: any;

    @UpdateDateColumn()
    updated_at?: any;

    @DeleteDateColumn()
    deleted_at?: any;
}