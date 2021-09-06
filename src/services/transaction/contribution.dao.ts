import { getConnection } from "typeorm";
import Dao from "../../interfaces/dao.interface";
import { Contribution } from "./contribution.entity";

export default class ContributionDao implements Dao{
    public save = async(data: any): Promise<any> => {
        if(!data){
            //throw missing params error
            console.log("Missing parameters")
            return
        }
        const contributionRepository = getConnection().getRepository(Contribution)
        try {
            const dataToSave: Contribution = data;
            const savedContribution = await contributionRepository.save(dataToSave)
            return savedContribution;
        } catch (error) {
            console.log(error)
        }
    }

    public getOne = async(id: string): Promise<any> => {
        if(!id){
            //throw missing params error
            console.log("Missing parameters")
            return
        }
        const contributionRepository = getConnection().getRepository(Contribution);
        try {
            const contribution = await contributionRepository.findOne(id, {relations: ["contribution_transactions", "pledges", "campuses"]})
            if(contribution){
                return contribution;
            }else{
                //throw missing record error
                console.log("Missing record")
            }
        } catch (error) {
           console.log(error) 
        }
    }

    public getAll = async(): Promise<any> => {
        const contributionRepository = getConnection().getRepository(Contribution);
        try {
            return await contributionRepository.find({relations: ["contribution_transactions", "pledges", "campuses"]})
        } catch (error) {
            console.log(error)    
        }
    }

    public update = async(id: string, data: any): Promise<any> => {
        if(!data || ! id){
            //throw missing params error
            console.log("Missing parameters")
            return
        }

        const contributionRepository = getConnection().getRepository(Contribution);
        try {
            const itemToUpdate = await contributionRepository.findOne(id)
            if(itemToUpdate){
                await contributionRepository.update(id, data)
                const updatedContribution = await contributionRepository.findOne(id, {relations: ["contribution_transactions", "pledges", "campuses"]})
                return updatedContribution
            }else{
                return "Missing records"
            }
        } catch (error) {
            console.log(error)
        }
    }

    public delete = async(id: string): Promise<any> => {
        if(!id){
            //throw missing params error
            console.log("Missing parameters")
            return
        }

        const contributionRepository = getConnection().getRepository(Contribution);
        try {
            const itemToDelete = await contributionRepository.findOne(id);
            if(itemToDelete){
                await contributionRepository.softDelete(id);
                return true;
            }else{
                return false
            }
        } catch (error) {
            console.log(error)
        }
    }

}