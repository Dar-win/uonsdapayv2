import Dao from "../../interfaces/dao.interface";
import { getConnection, getRepository } from "typeorm";
import { ContributionTransaction } from "./transaction_contribution.entity";
import MissingParametersException from "../../exceptions/MissingParametersException";
import RecordNotFoundException from "../../exceptions/RecordNotFoundException";

export default class ContributionTransactionDao implements Dao{

    public save = async(data: any): Promise<MissingParametersException | ContributionTransaction | Error> => {
        if(!data){
            throw new MissingParametersException()
        }
        const contributionTransactionRepository = getConnection().getRepository(ContributionTransaction)
        try {
            const dataToSave: ContributionTransaction = data;
            const savedContributionTransaction: ContributionTransaction = await contributionTransactionRepository.save(dataToSave)
            return savedContributionTransaction;
        } catch (error) {
            console.log(error)
            throw new Error()
        }
    }

    public getOne = async(id: string): Promise<MissingParametersException | RecordNotFoundException | ContributionTransaction | Error> => {
        if(!id){
            throw new MissingParametersException()
        }

        const contributionTransactionRepository = getConnection().getRepository(ContributionTransaction);
        try {
            const contributionTransaction: ContributionTransaction = await contributionTransactionRepository.findOne(id, {relations:["user", "quickUser", "contribution"]})
            if(contributionTransaction){
                return contributionTransaction;
            }else{
                throw new RecordNotFoundException()
            }
        } catch (error) {
           console.log(error)
           throw new Error()
        }
    }

    public getAll = async(): Promise<ContributionTransaction[] | Error> => {
        const contributionTransactionRepository = getConnection().getRepository(ContributionTransaction);
        try {
            return await contributionTransactionRepository.find({relations:["user", "quickUser", "contribution"]})
        } catch (error) {
            console.log(error)
            throw new Error() 
        }
    }

    public update = async(id: string, data: any): Promise<any> => {
        throw new Error("Method not implemented");
        
    }
    public delete = async(id: string): Promise<MissingParametersException | RecordNotFoundException | Error | boolean> => {
        if(!id){
            throw new MissingParametersException()
        }

        const contributionTransactionRepository = getConnection().getRepository(ContributionTransaction);
        try {
            const contributionTransactionToDelete = await contributionTransactionRepository.findOne(id);
            if(contributionTransactionToDelete){
                await contributionTransactionRepository.softDelete(id);
                return true;
            }else{
                throw new RecordNotFoundException()
            }
        } catch (error) {
            console.log(error)
            throw new Error()
        }
    }

}