import Dao from "../../interfaces/dao.interface";
import { getConnection, getRepository } from "typeorm";
import { PaymentTransaction } from "./transaction_payment.entity";
import { QuickUser } from "../user/quick_user.entity";
import MissingParametersException from "../../exceptions/MissingParametersException";
import RecordNotFoundException from "../../exceptions/RecordNotFoundException";

export default class PaymentTransactionDao implements Dao{

    public save = async(data: any): Promise<MissingParametersException | PaymentTransaction | Error> => {
        if(!data){
            throw new MissingParametersException()
        }

        const paymentTransactionRepository = getConnection().getRepository(PaymentTransaction)
        try {
            const dataToSave: PaymentTransaction = data;
            const savedPaymentTransaction: PaymentTransaction = await paymentTransactionRepository.save(dataToSave)
            return savedPaymentTransaction;
        } catch (error) {
            console.log(error)
            throw new Error()
        }
    }

    public getOne = async(id: string): Promise<MissingParametersException | PaymentTransaction | RecordNotFoundException | Error> => {
        if(!id){
            throw new MissingParametersException()
        }

        const paymentTransactionRepository = getConnection().getRepository(PaymentTransaction);
        try {
            const paymentTransaction: PaymentTransaction = await paymentTransactionRepository.findOne(id, {relations:["user", "quickUser", "payment_item"]})
            if(paymentTransaction){
                return paymentTransaction;
            }else{
                throw new RecordNotFoundException()
            }
        } catch (error) {
           console.log(error) 
           throw new Error()
        }
    }

    public getAll = async(): Promise<PaymentTransaction[] | Error> => {
        const paymentTransactionRepository = getConnection().getRepository(PaymentTransaction);
        try {
            return await paymentTransactionRepository.find({relations:["user", "quickUser", "payment_item"]})
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

        const paymentTransactionRepository = getConnection().getRepository(PaymentTransaction);
        try {
            const paymentTransactionToDelete = await paymentTransactionRepository.findOne(id);
            if(paymentTransactionToDelete){
                await paymentTransactionRepository.softDelete(id);
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