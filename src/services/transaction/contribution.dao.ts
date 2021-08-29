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
            const contribution = await contributionRepository.findOne(id, {relations: ["paymentItem", "pledges"]})
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
            return await contributionRepository.find({relations: ["paymentItem", "pledges"]})
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
                return await contributionRepository.update(id, data)
            }else{
                return "Missing records"
                console.log("missing record")
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