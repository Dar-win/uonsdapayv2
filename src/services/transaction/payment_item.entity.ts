import { PrimaryGeneratedColumn, Column, Entity, OneToMany, DeleteDateColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Contribution } from "./contribution.entity";
import { PaymentTransaction } from "./transaction_payment.entity";
import { ObjectType, ID, Field } from "type-graphql";

@ObjectType()
@Entity()
export class PaymentItem{
    @Field(()=>ID)
    @PrimaryGeneratedColumn({type:"int"})
    item_id: number;

    @Field()
    @Column({type: "varchar", length: 100})
    item_name: string;

    @Field(()=>[PaymentTransaction], { nullable: true })
    @OneToMany(()=> PaymentTransaction, paymentTransaction => paymentTransaction.payment_item)
    transactions: PaymentTransaction[];

    @CreateDateColumn()
    created_at?: any;

    @UpdateDateColumn()
    updated_at?: any;

    @DeleteDateColumn()
    deleted_at?: any;
}