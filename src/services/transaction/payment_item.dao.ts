import { getConnection } from "typeorm";
import Dao from "../../interfaces/dao.interface";
import { PaymentItem } from "./payment_item.entity";

export default class PaymentItemDao implements Dao{
    public save = async(data: any): Promise<any> => {
        if(!data){
            //throw missing params error
            console.log("Missing parameters")
            return
        }
        const paymentItemRepository = getConnection().getRepository(PaymentItem)
        try {
            const dataToSave: PaymentItem = data;
            const savedPaymentItem = await paymentItemRepository.save(dataToSave)
            return savedPaymentItem;
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
        const paymentItemRepository = getConnection().getRepository(PaymentItem);
        try {
            const paymentItem = await paymentItemRepository.findOne(id)
            if(paymentItem){
                return paymentItem;
            }else{
                //throw missing record error
                console.log("Missing record")
            }
        } catch (error) {
           console.log(error) 
        }
    }

    public getAll = async(): Promise<any> => {
        const paymentItemRepository = getConnection().getRepository(PaymentItem);
        try {
            return await paymentItemRepository.find()
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

        const paymentItemRepository = getConnection().getRepository(PaymentItem);
        try {
            const itemToUpdate = await paymentItemRepository.findOne(id)
            if(itemToUpdate){
                return await paymentItemRepository.update(id, data)
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

        const paymentItemRepository = getConnection().getRepository(PaymentItem);
        try {
            const itemToDelete = await paymentItemRepository.findOne(id);
            if(itemToDelete){
                await paymentItemRepository.softDelete(id);
                return true;
            }else{
                return false
            }
        } catch (error) {
            console.log(error)
        }
    }

}