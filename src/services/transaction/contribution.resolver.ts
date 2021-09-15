import { Resolver, Mutation, Query, Arg, FieldResolver, Root, ResolverInterface } from "type-graphql";
import { Contribution } from "./contribution.entity";
import ContributionDao from "./contribution.dao";
import { ContributionTransaction } from "./transaction_contribution.entity";
import { Pledge } from "./pledge.entity";
import { Campus } from "../user/campus.entity";
import { ContributionDto } from "./contribution.dto";

@Resolver(of => Contribution)
export class ContributionResolver implements ResolverInterface<Contribution>{

    private contributionsDao = new ContributionDao()

    @Query(returns =>[Contribution])
    async getContributions():Promise<any>{
        try {
            const contributions = await this.contributionsDao.getAll(2, 3);
            return contributions
        } catch (error) {
            return error
        }
    }

    @Query(returns => Contribution)
    async getContribution(@Arg('id') id:string):Promise<any>{
        try {
            const contribution = await this.contributionsDao.getOne(id);
            return contribution
        } catch (error) {
            return error
        }
    }

    @Mutation(returns => Contribution)
    async saveContribution(@Arg('contribution') contribution:ContributionDto):Promise<any>  {
        try {
            const savedContribution = await this.contributionsDao.save(contribution);
            return savedContribution;
        } catch (error) {
            return error;
        }
    }

    @Mutation(returns => Contribution)
    async updateContrbution(@Arg('id') id: string, @Arg('data') contribution: ContributionDto): Promise<any> {
        try {
            const updatedContribution = await this.contributionsDao.update(id, contribution)
            return updatedContribution;
        } catch (error) {
            return error;
        }
    }

    @Mutation(returns => Boolean)
    async deleteContribution(@Arg('id') id:string){
        try {
            const deleteStatus = await this.contributionsDao.delete(id)
            return deleteStatus;
        } catch (error) {
            return error;
        }
    }

    @FieldResolver(returns => [ContributionTransaction])
    async contribution_transactions(@Root() contribution: Contribution){
        try {
            return contribution.contribution_transactions
        } catch (error) {
            return error
        }
    }

    @FieldResolver(returns => [Pledge])
    async pledges(@Root() contribution: Contribution){
        try {
            return contribution.pledges;
        } catch (error) {
            return error;
        }
    }

    @FieldResolver(returns => [Campus])
    async campuses(@Root() contribution: Contribution){
        try{
            return contribution.campuses;
        }catch(error){
            return error
        }
    }
}