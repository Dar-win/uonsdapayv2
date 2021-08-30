import { Arg, FieldResolver, Mutation, Query, Resolver, ResolverInterface, Root } from "type-graphql";
import { getRepository, Transaction } from "typeorm";
import PledgeDao from "../transaction/pledge.dao";
import { Pledge } from "../transaction/pledge.entity";
import { ContributionTransaction } from "../transaction/transaction_contribution.entity";
import { PaymentTransaction } from "../transaction/transaction_payment.entity";
import { User } from "../user/user.entity";
import PaymentItemDao from "./payment_item.dao";
import { PaymentItem } from "./payment_item.entity";

@Resolver(of => PaymentItem)
export class PaymentItemResolver implements ResolverInterface<PaymentItem>{

    private paymentItemDao: PaymentItemDao = new PaymentItemDao();
    private paymentTransactionRepository = getRepository(PaymentTransaction)
    private paymentItemRepository = getRepository(PaymentItem)
    private userRepository = getRepository(User)

    @Query(returns => PaymentItem)
    async getPaymentItem (@Arg('id') id:string):Promise<PaymentItem | Error> {
        try {
            const paymentItem = await this.paymentItemDao.getOne(id);
            return paymentItem;
        } catch (error) {
            return error
        }
    }

    @Query(returns => [PaymentItem])
    async getPaymentItems():Promise<PaymentItem[]|Error> {
        try {
            const paymentItems = await this.paymentItemDao.getAll();
            return paymentItems;
        } catch (error) {
            return error
        }
    }

    @FieldResolver(returns=>[PaymentTransaction])
    async transactions(@Root() paymentItem:PaymentItem):Promise<PaymentTransaction[]>{
        try {
            const payment_transactions = await this.paymentTransactionRepository.find({payment_item:paymentItem})
            return payment_transactions;
        } catch (error) {
            return error
        }
    }

    
}