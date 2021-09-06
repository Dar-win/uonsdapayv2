import Dao from "../../interfaces/dao.interface";
import { getConnection, getRepository } from "typeorm";
import { ContributionTransaction } from "./transaction_contribution.entity";
import { QuickUser } from "../user/quick_user.entity";

export default class ContributionTransactionDao implements Dao{

    public save = async(data: any): Promise<any> => {
        if(!data){
            //throw missing params error
            console.log("Missing parameters")
            return
        }
        const contributionTransactionRepository = getConnection().getRepository(ContributionTransaction)
        try {
            const dataToSave: ContributionTransaction = data;
            const savedContributionTransaction = await contributionTransactionRepository.save(dataToSave)
            return savedContributionTransaction;
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
        const contributionTransactionRepository = getConnection().getRepository(ContributionTransaction);
        try {
            const contributionTransaction = await contributionTransactionRepository.findOne(id, {relations:["user", "quickUser", "contribution"]})
            if(contributionTransaction){
                return contributionTransaction;
            }else{
                //throw missing record error
                console.log("Missing record")
            }
        } catch (error) {
           console.log(error) 
        }
    }

    public getAll = async(): Promise<any> => {
        const contributionTransactionRepository = getConnection().getRepository(ContributionTransaction);
        try {
            return await contributionTransactionRepository.find({relations:["user", "quickUser", "contribution"]})
        } catch (error) {
            console.log(error)    
        }
    }

    public update = async(id: string, data: any): Promise<any> => {
        throw new Error("Method not implemented");
        
    }
    public delete = async(id: string): Promise<any> => {
        if(!id){
            //throw missing params error
            console.log("Missing parameters")
            return
        }

        const contributionTransactionRepository = getConnection().getRepository(ContributionTransaction);
        try {
            const contributionTransactionToDelete = await contributionTransactionRepository.findOne(id);
            if(contributionTransactionToDelete){
                await contributionTransactionRepository.softDelete(id);
                return true;
            }else{
                return false
            }
        } catch (error) {
            console.log(error)
        }
    }

}