import { Entity, Column, PrimaryGeneratedColumn, OneToMany, DeleteDateColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { PaymentTransaction } from "../transaction/transaction_payment.entity";
import { ContributionTransaction } from "../transaction/transaction_contribution.entity";
import { ObjectType, ID, Field } from "type-graphql";

@ObjectType()
@Entity()
export class QuickUser{
    @Field(type=>ID)
    @PrimaryGeneratedColumn({type: "int"})
    user_id: number;

    @Field()
    @Column({type: "varchar", length: 100})
    email_address: string;

    @Field()
    @Column({type: "varchar", length: 20})
    phone_number: string;

    @Field(()=>[PaymentTransaction], { nullable: true })
    @OneToMany(() => PaymentTransaction, paymentTransaction=>paymentTransaction.user)
    payment_transactions: PaymentTransaction[];

    @Field(()=>[ContributionTransaction], { nullable: true })
    @OneToMany(() => ContributionTransaction, contributionTransaction=>contributionTransaction.user)
    contribution_transactions: ContributionTransaction[];

    @CreateDateColumn()
    created_at?: any;

    @UpdateDateColumn()
    updated_at?: any;

    @DeleteDateColumn()
    deleted_at?: any;

}