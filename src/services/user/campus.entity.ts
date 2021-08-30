import { PrimaryGeneratedColumn, Column, Entity, OneToMany, DeleteDateColumn, CreateDateColumn, UpdateDateColumn, ManyToMany } from "typeorm";
import { Contribution } from "../transaction/contribution.entity";
import { User } from "./user.entity";
import { ObjectType, ID, Field } from "type-graphql";

@ObjectType()
@Entity()
export class Campus{

    @Field(type=>ID)
    @PrimaryGeneratedColumn({type:"int"})
    campus_id: number;

    @Field()
    @Column({type: "varchar", length: 100})
    campus_name: string;

    @Field(type => [User], { nullable: true })
    @OneToMany(()=>User, user => user.campus)
    users: User[];

    @Field(type => [Contribution], { nullable: true })
    @ManyToMany(()=>Contribution, contribution => contribution.campuses)
    contributions: Contribution[]

    @CreateDateColumn()
    created_at?: any;

    @UpdateDateColumn()
    updated_at?: any;

    @DeleteDateColumn()
    deleted_at?: any;
}