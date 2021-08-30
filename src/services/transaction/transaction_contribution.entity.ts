import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, DeleteDateColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "../user/user.entity";
import { QuickUser } from "../user/quick_user.entity";
import { Contribution } from "./contribution.entity";
import { ObjectType, ID, Field, Int } from "type-graphql";

@ObjectType()
@Entity()
export class ContributionTransaction{
    @Field(()=>ID)
    @PrimaryGeneratedColumn({type: "int", })
    transaction_id: number;

    @Field(()=>User)
    @ManyToOne(() => User, user => user.contribution_transactions, {nullable:true})
    user: User;

    @Field(()=>QuickUser)
    @ManyToOne(() => QuickUser, quickUser => quickUser.contribution_transactions, {nullable:true})
    quickUser: QuickUser;

    @Field(()=>Contribution)
    @ManyToOne(()=> Contribution, contribution => contribution.contribution_transactions)
    contribution: Contribution;

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