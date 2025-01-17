import { Arg, FieldResolver, Mutation, Query, Resolver, ResolverInterface, Root } from "type-graphql";
import { Pledge } from "../transaction/pledge.entity";
import { ContributionTransaction } from "../transaction/transaction_contribution.entity";
import { PaymentTransaction } from "../transaction/transaction_payment.entity";
import { Campus } from "./campus.entity";
import UserDao from "./user.dao";
import { User } from "./user.entity";
import {UserDto} from "./user.dto"
import { UpdateUserDto } from "./user.update.dto";

@Resolver(of => User)
export class UserResolver implements ResolverInterface<User>{

    private userDao: UserDao = new UserDao();
    
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

    @Mutation(returns => User)
    async saveUser(@Arg('user') user: UserDto): Promise<User | Error>{
        try {
            const createdUser = await this.userDao.save(user)
            return createdUser;
        } catch (error) {
            return error
        }
    }

    @Mutation(returns => User)
    async updateUser(@Arg('id') id: string, @Arg('userData') data: UpdateUserDto): Promise<any>{
        try {
            const updatedUser = await this.userDao.update(id, data);
            return updatedUser
        } catch (error) {
            return error
        }
    }

    @Mutation(returns=> Boolean)
    async deleteUser(@Arg('id') id: string){
        try {
            return await this.userDao.delete(id)
        } catch (error) {
            return error;
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

    @FieldResolver(returns => [ContributionTransaction])
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