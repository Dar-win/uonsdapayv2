import { type, userInfo } from "os";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from "typeorm";
import { User } from "../user/user.entity";
import { Contribution } from "./contribution.entity";
import { ObjectType, ID, Field, Int } from "type-graphql";

@ObjectType()
@Entity()
export class Pledge{
    @Field(()=>ID)
    @PrimaryGeneratedColumn()
    pledgeId: number;

    @Field(()=>Int)
    @Column({type: "int"})
    amount: number;

    @Field()
    @Column({type: "varchar", default: "unfulfilled"})
    status: string

    @Field(()=>User)
    @ManyToOne(() => User, user=> user.pledges)
    user: User;

    @Field(()=>Contribution)
    @ManyToOne(()=> Contribution, contribution => contribution.pledges)
    contribution: Contribution;

    @CreateDateColumn()
    created_at?: any;

    @UpdateDateColumn()
    updated_at?: any;

    @DeleteDateColumn()
    deleted_at?: any;
}