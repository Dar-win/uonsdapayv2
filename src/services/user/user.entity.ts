import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, DeleteDateColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Campus } from "./campus.entity";
import { PaymentTransaction } from "../transaction/transaction_payment.entity";
import { Pledge } from "../transaction/pledge.entity";
import { ContributionTransaction } from "../transaction/transaction_contribution.entity";

@Entity()
export class User{
    @PrimaryGeneratedColumn({
        type: "int",
    })
    user_id: number;

    @Column({type: "varchar", length: 50})
    first_name: string;

    @Column({type: "varchar", length: 50})
    last_name: string;

    @Column({type: "varchar", length: 100})
    email_address: string;

    @Column({type: "varchar", length: 20})
    phone_number: string;

    @Column({type: "boolean"})
    is_member: boolean;

    @ManyToOne(() => Campus, campus => campus.users)
    campus: Campus;

    @OneToMany(()=>Pledge, pledge => pledge.user)
    pledges: Pledge[]

    @Column({type: "varchar", length:200, default:"uonsda"})
    local_church: string;

    @OneToMany(() => PaymentTransaction, paymentTransaction=>paymentTransaction.user)
    payment_transactions: PaymentTransaction[];

    @OneToMany(() => ContributionTransaction, contributionTransaction=>contributionTransaction.user)
    contribution_transactions: ContributionTransaction[];

    @CreateDateColumn()
    created_at: any;

    @UpdateDateColumn()
    updated_at: any;

    @DeleteDateColumn()
    deleted_at: any;

}