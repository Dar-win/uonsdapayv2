import { Resolver, Mutation, Query } from "type-graphql";
import { Contribution } from "./contribution.entity";
import ContributionDao from "./contribution.dao";

export class ContributionResolver{

    private contributionsDao = new ContributionDao()

    @Query(returns =>[Contribution])
    async getContributions():Promise<Contribution>{
        try {
            const contributions = await this.contributionsDao.getAll();
            return contributions
        } catch (error) {
            return error
        }
    }
}