import { Entity, Column, PrimaryGeneratedColumn, OneToMany, DeleteDateColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { PaymentTransaction } from "../transaction/transaction_payment.entity";
import { ContributionTransaction } from "../transaction/transaction_contribution.entity";

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

    @OneToMany(() => PaymentTransaction, paymentTransaction=>paymentTransaction.user)
    payment_transactions: PaymentTransaction[];

    @OneToMany(() => ContributionTransaction, contributionTransaction=>contributionTransaction.user)
    contribution_transactions: ContributionTransaction[];

}