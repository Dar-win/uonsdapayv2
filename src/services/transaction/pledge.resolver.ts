import { Arg, FieldResolver, Mutation, Query, Resolver, ResolverInterface, Root } from "type-graphql";
import { getRepository, Transaction } from "typeorm";
import { User } from "../user/user.entity";
import { Contribution } from "./contribution.entity";
import PledgeDao from "./pledge.dao";
import { Pledge } from "./pledge.entity";

@Resolver(of => Pledge)
export class PledgeResolver implements ResolverInterface<Pledge>{

    private pledgeDao: PledgeDao = new PledgeDao();
    private contributionsRepository = getRepository(Contribution)
    private userRepository = getRepository(User)

    @Query(returns => Pledge)
    async getPledge (@Arg('id') id:string):Promise<Pledge | Error> {
        try {
            const pledge = await this.pledgeDao.getOne(id);
            return pledge;
        } catch (error) {
            return error
        }
    }

    @Query(returns => [Pledge])
    async getPledges():Promise<Pledge[]|Error> {
        try {
            const pledges = await this.pledgeDao.getAll();
            return pledges;
        } catch (error) {
            return error
        }
    }

    @FieldResolver(returns=>User)
    async user(@Root() pledge:Pledge):Promise<User>{
        try {
            return pledge.user;
        } catch (error) {
            return error
        }
    }

    @FieldResolver(returns => Contribution)
    async contribution(@Root() pledge:Pledge):Promise<Contribution>{
        try {
            return pledge.contribution
        } catch (error) {
            return error
        }
    }

    
}