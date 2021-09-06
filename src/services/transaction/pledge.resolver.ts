import { Arg, FieldResolver, Mutation, Query, Resolver, ResolverInterface, Root } from "type-graphql";
import { getRepository, Transaction } from "typeorm";
import { User } from "../user/user.entity";
import { Contribution } from "./contribution.entity";
import PledgeDao from "./pledge.dao";
import { Pledge } from "./pledge.entity";
import { PledgeDto } from "./pledge.dto";

@Resolver(of => Pledge)
export class PledgeResolver implements ResolverInterface<Pledge>{

    private pledgeDao: PledgeDao = new PledgeDao();

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

    @Mutation(returns => Pledge)
    async savePledge(@Arg('pledge') pledge:PledgeDto):Promise<any>  {
        try {
            const savedPledge = await this.pledgeDao.save(pledge);
            return savedPledge;
        } catch (error) {
            return error;
        }
    }

    @Mutation(returns => Pledge)
    async updatePledge(@Arg('id') id: string, @Arg('data') pledge: PledgeDto): Promise<any> {
        try {
            const updatedPledge = await this.pledgeDao.update(id, pledge)
            return updatedPledge;
        } catch (error) {
            return error;
        }
    }

    @Mutation(returns => Boolean)
    async deletePledge(@Arg('id') id:string){
        try {
            const deleteStatus = await this.pledgeDao.delete(id)
            return deleteStatus;
        } catch (error) {
            return error;
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