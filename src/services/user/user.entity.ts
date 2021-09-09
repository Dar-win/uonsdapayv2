import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, DeleteDateColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Campus } from "./campus.entity";
import { PaymentTransaction } from "../transaction/transaction_payment.entity";
import { Pledge } from "../transaction/pledge.entity";
import { ContributionTransaction } from "../transaction/transaction_contribution.entity";
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
@Entity()
export class User{
    @PrimaryGeneratedColumn({type: "int"})
    @Field(type => ID)
    user_id: number;

    @Field()
    @Column({type: "varchar", length: 50})
    first_name: string;

    @Field()
    @Column({type: "varchar", length: 50})
    last_name: string;

    @Field()
    @Column({type: "varchar", length: 100})
    email_address: string;

    @Field()
    @Column({type:"varchar", length:150})
    password: string;

    @Field()
    @Column({type: "varchar", length: 20})
    phone_number: string;

    @Field()
    @Column({type: "boolean"})
    is_member: boolean;

    @Field(()=>Campus, {nullable: true})
    @ManyToOne(() => Campus, campus => campus.users)
    campus: Campus;

    @Field(()=>[Pledge], { nullable: true })
    @OneToMany(()=>Pledge, pledge => pledge.user)
    pledges?: Pledge[]

    @Field()
    @Column({type: "varchar", length:200, default:"uonsda"})
    local_church: string;

    @Field(()=>[PaymentTransaction], { nullable: true })
    @OneToMany(() => PaymentTransaction, paymentTransaction=>paymentTransaction.user)
    payment_transactions?: PaymentTransaction[];

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