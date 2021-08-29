import { type } from 'os';
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn, DeleteDateColumn, CreateDateColumn, UpdateDateColumn, OneToMany} from 'typeorm'
import { Campus } from '../user/campus.entity';
import { PaymentItem } from './payment_item.entity';
import { Pledge } from './pledge.entity';
import { ContributionTransaction } from './transaction_contribution.entity';

@Entity()
export class Contribution{
    @PrimaryGeneratedColumn()
    contribution_id: number;

    @ManyToOne(() => Campus, campus => campus.contributions)
    campus: Campus

    @ManyToOne(()=>PaymentItem, paymentItem => paymentItem.contributions)
    paymentItem: PaymentItem;

    @OneToMany(() => ContributionTransaction, contributionTransaction => contributionTransaction.contribution)
    contribution_transactions: ContributionTransaction;

    @OneToMany(()=>Pledge, pledge => pledge.contribution)
    pledges: Pledge[];

    @Column({type:"int"})
    goal: number;

    @CreateDateColumn()
    created_at: any;

    @UpdateDateColumn()
    updated_at: any;

    @DeleteDateColumn()
    deleted_at: any;
}