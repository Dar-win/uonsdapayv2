import { userInfo } from "os";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from "typeorm";
import { User } from "../user/user.entity";
import { Contribution } from "./contribution.entity";

@Entity()
export class Pledge{
    @PrimaryGeneratedColumn()
    pledgeId: number;

    @Column()
    amount: number;

    @Column({type: "varchar", default: "unfulfilled"})
    status: string

    @ManyToOne(() => User, user=> user.pledges)
    user: User;

    @ManyToOne(()=> Contribution, contribution => contribution.pledges)
    contribution: Contribution;

    @CreateDateColumn()
    created_at: any;

    @UpdateDateColumn()
    updated_at: any;

    @DeleteDateColumn()
    deleted_at: any;
}