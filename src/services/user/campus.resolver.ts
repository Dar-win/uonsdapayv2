import { Arg, FieldResolver, Mutation, Query, Resolver, ResolverInterface, Root } from "type-graphql";
import { getRepository } from "typeorm";
import { Campus } from "./campus.entity";
import { User } from "./user.entity";
import CampusDao from "./campus.dao";
import { Contribution } from "../transaction/contribution.entity";
import { CampusDto } from "./campus.dto";

@Resolver(of => Campus)
export class CampusResolver implements ResolverInterface<Campus>{

    private campusDao: CampusDao = new CampusDao();
    private contributionsRepository = getRepository(Contribution)
    private userRepository = getRepository(User)

    @Query(returns => Campus)
    async getCampus (@Arg('id') id:string):Promise<Campus | Error> {
        try {
            const campus = await this.campusDao.getOne(id);
            return campus;
        } catch (error) {
            return error
        }
    }

    @Query(returns => [Campus])
    async getCampuses():Promise<Campus[]|Error> {
        try {
            const campuses = await this.campusDao.getAll();
            return campuses;
        } catch (error) {
            return error
        }
    }

    @Mutation(returns => Campus)
    async addCampus(@Arg('newCampus') newCampus:CampusDto): Promise<Campus> {
        try {
            const campus = await this.campusDao.save(newCampus);
            return campus
        } catch (error) {
            return error
        }
    }

    @Mutation(returns => Campus)
    async updateCampus(@Arg('campusInformation') campusInformation:CampusDto, @Arg('id') id:string): Promise<Campus> {
        try {
            const campus = await this.campusDao.update(id, campusInformation);
            return campus
        } catch (error) {
            return error
        }
    }

    @FieldResolver(returns=>[Contribution])
    async contributions(@Root() campus:Campus):Promise<Contribution[]>{
        try {
            // const contributions = await this.contributionsRepository.find({})
            return campus.contributions;
        } catch (error) {
            return error
        }
    }

    @FieldResolver(returns => [User])
    async users(@Root() campus:Campus):Promise<User[]>{
        try {
            const users = await this.userRepository.find({campus:campus})
            return users
        } catch (error) {
            return error
        }
    }

    
}