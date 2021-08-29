import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, DeleteDateColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { PaymentItem } from "./payment_item.entity";
import { User } from "../user/user.entity";
import { QuickUser } from "../user/quick_user.entity";
import { Contribution } from "./contribution.entity";

@Entity()
export class ContributionTransaction{
    @PrimaryGeneratedColumn({type: "int", })
    transaction_id: number;

    @ManyToOne(() => User, user => user.contribution_transactions, {nullable:true})
    user: User;

    @ManyToOne(() => QuickUser, quickUser => quickUser.contribution_transactions, {nullable:true})
    quickUser: QuickUser;

    @ManyToOne(type=> Contribution, contribution => contribution.contribution_transactions)
    contribution: Contribution;

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