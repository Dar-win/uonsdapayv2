import Dao from "../../interfaces/dao.interface";
import { getConnection, getRepository } from "typeorm";
import { PaymentTransaction } from "./transaction_payment.entity";
import { QuickUser } from "../user/quick_user.entity";

export default class PaymentTransactionDao implements Dao{

    public save = async(data: any): Promise<any> => {
        if(!data){
            //throw missing params error
            console.log("Missing parameters")
            return
        }
        const paymentTransactionRepository = getConnection().getRepository(PaymentTransaction)
        try {
            const dataToSave: PaymentTransaction = data;
            const savedPaymentTransaction = await paymentTransactionRepository.save(dataToSave)
            return savedPaymentTransaction;
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
        const paymentTransactionRepository = getConnection().getRepository(PaymentTransaction);
        try {
            const paymentTransaction = await paymentTransactionRepository.findOne(id, {relations:["user", "quickUser", "payment_item"]})
            if(paymentTransaction){
                return paymentTransaction;
            }else{
                //throw missing record error
                console.log("Missing record")
            }
        } catch (error) {
           console.log(error) 
        }
    }

    public getAll = async(): Promise<any> => {
        const paymentTransactionRepository = getConnection().getRepository(PaymentTransaction);
        try {
            return await paymentTransactionRepository.find({relations:["user", "quickUser", "payment_item"]})
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

        const paymentTransactionRepository = getConnection().getRepository(PaymentTransaction);
        try {
            const paymentTransactionToDelete = await paymentTransactionRepository.findOne(id);
            if(paymentTransactionToDelete){
                await paymentTransactionRepository.softDelete(id);
                return true;
            }else{
                return false
            }
        } catch (error) {
            console.log(error)
        }
    }

}