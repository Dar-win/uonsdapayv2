import { type } from 'os';
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn, DeleteDateColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, JoinTable} from 'typeorm'
import { Campus } from '../user/campus.entity';
import { PaymentItem } from './payment_item.entity';
import { Pledge } from './pledge.entity';
import { ContributionTransaction } from './transaction_contribution.entity';
import { ObjectType, ID, Field, Int } from "type-graphql";

@ObjectType()
@Entity()
export class Contribution{
    @Field(()=>ID)
    @PrimaryGeneratedColumn()
    contribution_id: number;

    @Field(type=>[Campus])
    @ManyToMany(() => Campus, campus => campus.contributions)
    @JoinTable({name:"campus_contributions"})
    campuses: Campus[]

    @Field()
    @Column({type: "varchar", length:150})
    contribution_name: string;

    @Column({type: "varchar", length: 20, default: "open"})
    status: string;

    @Field(()=>Int)
    @Column({type:"int"})
    goal: number;

    @Field(type=>[ContributionTransaction], { nullable: true })
    @OneToMany(() => ContributionTransaction, contributionTransaction => contributionTransaction.contribution)
    contribution_transactions: ContributionTransaction[];

    @Field(()=>[Pledge], { nullable: true })
    @OneToMany(()=>Pledge, pledge => pledge.contribution)
    pledges: Pledge[];

    @CreateDateColumn()
    created_at?: any;

    @UpdateDateColumn()
    updated_at?: any;

    @DeleteDateColumn()
    deleted_at?: any;
}