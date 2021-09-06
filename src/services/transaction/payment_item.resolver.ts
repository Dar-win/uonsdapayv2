import { Arg, FieldResolver, Mutation, Query, Resolver, ResolverInterface, Root } from "type-graphql";
import { getRepository, Transaction } from "typeorm";import { PaymentTransaction } from "../transaction/transaction_payment.entity";
import { User } from "../user/user.entity";
import PaymentItemDao from "./payment_item.dao";
import { PaymentItem } from "./payment_item.entity";
import { PaymentItemDto } from "./payment_item.dto";

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
            return paymentItem.transactions;
        } catch (error) {
            return error
        }
    }

    @Mutation(returns => PaymentItem)
    async savePaymentItem(@Arg('paymentItemData') paymentItem: PaymentItemDto){
        try {
            const savedPaymentItem = await this.paymentItemDao.save(paymentItem)
            return savedPaymentItem;
        } catch (error) {
            return error;
        }
    }

    @Mutation(returns => PaymentItem)
    async updatePaymentItem(@Arg('id') id: string, @Arg('paymentItemData') paymentItem: PaymentItemDto){
        try {
            const updatedPaymentItem = await this.paymentItemDao.update(id, paymentItem)
            return updatedPaymentItem;
        } catch (error) {
            return error;
        }
    }

    @Mutation(returns => Boolean)
    async deletePaymentItem(@Arg('id') id: string){
        try {
            const deleteStatus = await this.paymentItemDao.delete(id)
            return deleteStatus;
        } catch (error) {
            return error;
        }
    }
    
}