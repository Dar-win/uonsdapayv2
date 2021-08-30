import { Arg, FieldResolver, Mutation, Query, Resolver, ResolverInterface, Root } from "type-graphql";
import { getRepository, Transaction } from "typeorm";
import PledgeDao from "../transaction/pledge.dao";
import { Pledge } from "../transaction/pledge.entity";
import { ContributionTransaction } from "../transaction/transaction_contribution.entity";
import { PaymentTransaction } from "../transaction/transaction_payment.entity";
import { Campus } from "./campus.entity";
import UserDao from "./user.dao";
import { User } from "./user.entity";

@Resolver(of => User)
export class UserResolver implements ResolverInterface<User>{

    private userDao: UserDao = new UserDao();
    private pledgeDao: PledgeDao = new PledgeDao();
    private pledgeRepository = getRepository(Pledge);
    private userRepository = getRepository(User)
    private campusRepository = getRepository(Campus)
    private paymentTransactionRepository = getRepository(PaymentTransaction)
    private contributionTransactionRepository = getRepository(ContributionTransaction)

    @Query(returns => User)
    async getUser (@Arg('id') id:string):Promise<User | Error> {
        try {
            const user = await this.userDao.getOne(id);
            return user;
        } catch (error) {
            return error
        }
    }

    @Query(returns => [User])
    async getUsers():Promise<User[]|Error> {
        try {
            const users = await this.userDao.getAll();
            return users;
        } catch (error) {
            return error
        }
    }

    @FieldResolver(returns => [PaymentTransaction])
    async payment_transactions(@Root() user:User): Promise<PaymentTransaction[]> {
        try {
            // const transactions = await this.paymentTransactionRepository.find({user})
            return user.payment_transactions
        } catch (error) {
            return error
        }
    }

    @FieldResolver(returns => [PaymentTransaction])
    async contribution_transactions(@Root() user:User): Promise<ContributionTransaction[]> {
        try {
            // const transactions = await this.contributionTransactionRepository.find({user})
            return user.contribution_transactions
        } catch (error) {
            return error
        }
    }

    @FieldResolver(returns => [Pledge])
    async pledges(@Root() user:User): Promise<Pledge[]> {
        try {
            // const pledges = await this.pledgeRepository.find({user})
            return user.pledges
        } catch (error) {
            return error
        }
    }

    @FieldResolver(returns => Campus)
    campus(@Root() user:User) {
        try {
            // const campus = await this.campusRepository.find({users:[user]})
            return user.campus
        } catch (error) {
            return error
        }
    }
}