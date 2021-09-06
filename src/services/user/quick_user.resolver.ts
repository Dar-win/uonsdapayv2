import { Arg, FieldResolver, Mutation, Query, Resolver, ResolverInterface, Root } from "type-graphql";
import { ContributionTransaction } from "../transaction/transaction_contribution.entity";
import { PaymentTransaction } from "../transaction/transaction_payment.entity";
import { QuickUserDao } from "./quick_user.dao";
import { QuickUserDto } from "./quick_user.dto";
import { QuickUser } from "./quick_user.entity";

@Resolver(of => QuickUser)
export class QuickUserResolver implements ResolverInterface<QuickUser>{

    private quickUserDao: QuickUserDao = new QuickUserDao();
    
    @Query(returns => QuickUser)
    async getQuickUser (@Arg('id') id:string):Promise<QuickUser | Error> {
        try {
            const quickUser = await this.quickUserDao.getOne(id);
            return quickUser;
        } catch (error) {
            return error
        }
    }

    @Query(returns => [QuickUser])
    async getQuickUsers():Promise<QuickUser[]|Error> {
        try {
            const quickUsers = await this.quickUserDao.getAll();
            return quickUsers;
        } catch (error) {
            return error
        }
    }

    @Mutation(returns => QuickUser)
    async saveQuickUser(@Arg('quickUser') quickUser: QuickUserDto): Promise<QuickUser | Error>{
        try {
            const createdQuickUser = await this.quickUserDao.save(quickUser)
            return createdQuickUser;
        } catch (error) {
            return error
        }
    }

    @Mutation(returns => QuickUser)
    async updateQuickUser(@Arg('id') id: string, @Arg('quickUserData') data: QuickUserDto): Promise<any>{
        try {
            const updatedQuickUser = await this.quickUserDao.update(id, data);
            return updatedQuickUser
        } catch (error) {
            return error
        }
    }

    @FieldResolver(returns => [PaymentTransaction])
    async payment_transactions(@Root() quickUser:QuickUser): Promise<PaymentTransaction[]> {
        try {
            // const transactions = await this.paymentTransactionRepository.find({quickUser})
            return quickUser.payment_transactions
        } catch (error) {
            return error
        }
    }

    @FieldResolver(returns => [ContributionTransaction])
    async contribution_transactions(@Root() quickUser:QuickUser): Promise<ContributionTransaction[]> {
        try {
            // const transactions = await this.contributionTransactionRepository.find({quickUser})
            return quickUser.contribution_transactions
        } catch (error) {
            return error
        }
    }

}