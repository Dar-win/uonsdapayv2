import { Arg, FieldResolver, Mutation, Query, Resolver, ResolverInterface, Root } from "type-graphql";
import { getRepository, Transaction } from "typeorm";
import { QuickUser } from "../user/quick_user.entity";
import { User } from "../user/user.entity";
import { Contribution } from "./contribution.entity";
import ContributionTransactionDao from "./transaction_contribution.dao";
import { ContributionTransaction } from "./transaction_contribution.entity";

@Resolver(of => ContributionTransaction)
export class ContributionTransactionResolver implements ResolverInterface<ContributionTransaction>{

    private contributionTransactionDao: ContributionTransactionDao = new ContributionTransactionDao();
    private contributionsRepository = getRepository(Contribution)
    private userRepository = getRepository(User)

    @Query(returns => ContributionTransaction)
    async getContributionTransaction (@Arg('id') id:string):Promise<ContributionTransaction | Error> {
        try {
            const transaction = await this.contributionTransactionDao.getOne(id);
            return transaction;
        } catch (error) {
            return error
        }
    }

    @Query(returns => [ContributionTransaction])
    async getContributionTransactions():Promise<ContributionTransaction[]|Error> {
        try {
            const contributions = await this.contributionTransactionDao.getAll();
            return contributions;
        } catch (error) {
            return error
        }
    }

    @FieldResolver(returns=>User)
    async user(@Root() contributionTransaction:ContributionTransaction):Promise<User>{
        try {
            return contributionTransaction.user;
        } catch (error) {
            return error
        }
    }

    @FieldResolver(returns => Contribution)
    async contribution(@Root() contributionTransaction:ContributionTransaction):Promise<Contribution>{
        try {
            return contributionTransaction.contribution
        } catch (error) {
            return error
        }
    }

    @FieldResolver(returns => QuickUser)
    async quickUser(@Root() contributionTransaction:ContributionTransaction):Promise<QuickUser>{
        try {
            return contributionTransaction.quickUser
        } catch (error) {
            return error
        }
    }
    
}