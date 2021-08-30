import { Arg, FieldResolver, Mutation, Query, Resolver, ResolverInterface, Root } from "type-graphql";
import { getRepository, Transaction } from "typeorm";
import { QuickUser } from "../user/quick_user.entity";
import { User } from "../user/user.entity";
import { Contribution } from "./contribution.entity";
import { PaymentItem } from "./payment_item.entity";
import ContributionTransactionDao from "./transaction_contribution.dao";
import PaymentTransactionDao from "./transaction_payment.dao";
import { PaymentTransaction } from "./transaction_payment.entity";

@Resolver(of => PaymentTransaction)
export class PaymentTransactionResolver implements ResolverInterface<PaymentTransaction>{

    private paymentTransactionDao: PaymentTransactionDao = new PaymentTransactionDao();

    @Query(returns => PaymentTransaction)
    async getPaymentTransaction (@Arg('id') id:string):Promise<PaymentTransaction | Error> {
        try {
            const transaction = await this.paymentTransactionDao.getOne(id);
            return transaction;
        } catch (error) {
            return error
        }
    }

    @Query(returns => [PaymentTransaction])
    async getPaymentTransactions():Promise<PaymentTransaction[]|Error> {
        try {
            const paymentTransactions = await this.paymentTransactionDao.getAll();
            return paymentTransactions;
        } catch (error) {
            return error
        }
    }

    @FieldResolver(returns=>User)
    async user(@Root() paymentTransaction:PaymentTransaction):Promise<User>{
        try {
            return paymentTransaction.user;
        } catch (error) {
            return error
        }
    }

    @FieldResolver(returns => PaymentItem)
    async payment_item(@Root() paymentTransaction:PaymentTransaction):Promise<PaymentItem>{
        try {
            return paymentTransaction.payment_item
        } catch (error) {
            return error
        }
    }

    @FieldResolver(returns => QuickUser)
    async quickUser(@Root() paymentTransaction:PaymentTransaction):Promise<QuickUser>{
        try {
            return paymentTransaction.quickUser
        } catch (error) {
            return error
        }
    }
    
}