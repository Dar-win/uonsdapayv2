import Dao from "../../interfaces/dao.interface";
import { getConnection, getRepository } from "typeorm";
import { Transaction } from "./transaction.entity";
import { QuickUser } from "../user/quick_user.entity";

export default class TransactionDao implements Dao{

    public save = async(data: any): Promise<any> => {
        if(!data){
            //throw missing params error
            console.log("Missing parameters")
            return
        }
        const transactionRepository = getConnection().getRepository(Transaction)
        try {
            const dataToSave: Transaction = data;
            const savedTransaction = await transactionRepository.save(dataToSave)
            return savedTransaction;
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
        const transactionRepository = getConnection().getRepository(Transaction);
        try {
            const transaction = await transactionRepository.findOne(id, {relations:["user", "quickUser", "payment_item"]})
            if(transaction){
                return transaction;
            }else{
                //throw missing record error
                console.log("Missing record")
            }
        } catch (error) {
           console.log(error) 
        }
    }

    public getAll = async(): Promise<any> => {
        const transactionRepository = getConnection().getRepository(Transaction);
        try {
            return await transactionRepository.find({relations:["user", "quickUser", "payment_item"]})
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

        const transactionRepository = getConnection().getRepository(Transaction);
        try {
            const transactionToDelete = await transactionRepository.findOne(id);
            if(transactionToDelete){
                await transactionRepository.softDelete(id);
                return true;
            }else{
                return false
            }
        } catch (error) {
            console.log(error)
        }
    }

}