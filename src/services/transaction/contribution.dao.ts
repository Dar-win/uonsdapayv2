import { getConnection } from "typeorm";
import MissingParametersException from "../../exceptions/MissingParametersException";
import RecordNotFoundException from "../../exceptions/RecordNotFoundException";
import Dao from "../../interfaces/dao.interface";
import { Contribution } from "./contribution.entity";

export default class ContributionDao implements Dao{
    public save = async(data: any): Promise<MissingParametersException | Contribution | Error> => {
        if(!data){
            throw new MissingParametersException()
        }
        const contributionRepository = getConnection().getRepository(Contribution)
        try {
            const dataToSave: Contribution = data;
            const savedContribution: Contribution = await contributionRepository.save(dataToSave)
            return savedContribution;
        } catch (error) {
            console.log(error)
            throw new Error();
        }
    }

    public getOne = async(id: string): Promise<MissingParametersException | Contribution | RecordNotFoundException | Error> => {
        if(!id){
            throw new MissingParametersException()
        }
        const contributionRepository = getConnection().getRepository(Contribution);
        try {
            const contribution: Contribution = await contributionRepository.findOne(id, {relations: ["contribution_transactions", "pledges", "campuses"]})
            if(contribution){
                return contribution;
            }else{
                throw new RecordNotFoundException()
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    public getAll = async(page: number, limit: number): Promise<Contribution[] | Error> => {
        const contributionRepository = getConnection().getRepository(Contribution);
        try {
            const contributions = contributionRepository.createQueryBuilder("contribution")
            contributions.leftJoinAndSelect("contribution.contribution_transactions", "contribution_transactions")
                .take(limit)
                .skip((page - 1)*limit)
            return await contributions.getMany();
            // return await contributionRepository.find({relations: ["contribution_transactions", "pledges", "campuses"]})
        } catch (error) {
            console.log(error)    
            throw new Error()
        }
    }

    public update = async(id: string, data: any): Promise<MissingParametersException | Contribution | RecordNotFoundException | Error> => {
        if(!data || ! id){
            throw new MissingParametersException()
        }

        const contributionRepository = getConnection().getRepository(Contribution);
        try {
            const itemToUpdate = await contributionRepository.findOne(id)
            if(itemToUpdate){
                await contributionRepository.update(id, data)
                const updatedContribution: Contribution = await contributionRepository.findOne(id, {relations: ["contribution_transactions", "pledges", "campuses"]})
                return updatedContribution
            }else{
                throw new RecordNotFoundException()
            }
        } catch (error) {
            throw new Error()
        }
    }

    public delete = async(id: string): Promise<MissingParametersException | RecordNotFoundException | boolean | Error> => {
        if(!id){
            throw new MissingParametersException()
        }

        const contributionRepository = getConnection().getRepository(Contribution);
        try {
            const itemToDelete = await contributionRepository.findOne(id);
            if(itemToDelete){
                await contributionRepository.softDelete(id);
                return true;
            }else{
                throw new RecordNotFoundException()
            }
        } catch (error) {
            throw new Error()
        }
    }

}