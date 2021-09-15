import { getConnection } from "typeorm";
import MissingParametersException from "../../exceptions/MissingParametersException";
import RecordNotFoundException from "../../exceptions/RecordNotFoundException";
import Dao from "../../interfaces/dao.interface";
import { PaymentItem } from "./payment_item.entity";

export default class PaymentItemDao implements Dao{

    public save = async(data: any): Promise<MissingParametersException | PaymentItem | Error> => {
        if(!data){
            throw new MissingParametersException()
        }
        const paymentItemRepository = getConnection().getRepository(PaymentItem)
        try {
            const dataToSave: PaymentItem = data;
            const savedPaymentItem: PaymentItem = await paymentItemRepository.save(dataToSave)
            return savedPaymentItem;
        } catch (error) {
            throw new Error()
        }
    }

    public getOne = async(id: string): Promise<MissingParametersException | PaymentItem | RecordNotFoundException | Error> => {
        if(!id){
            throw new MissingParametersException()
        }
        const paymentItemRepository = getConnection().getRepository(PaymentItem);

        try {
            const paymentItem: PaymentItem = await paymentItemRepository.findOne(id, {relations: ["transactions"]})
            if(paymentItem){
                return paymentItem;
            }else{
                throw new RecordNotFoundException()
            }
        } catch (error) {
            throw new Error()
        }
    }

    public getAll = async(page: number, limit: number): Promise<PaymentItem[] | Error> => {
        if(!page || !limit) throw new MissingParametersException()
        const paymentItemRepository = getConnection().getRepository(PaymentItem);
        try {
            const paymentItems = paymentItemRepository.createQueryBuilder("paymentItem");
            paymentItems.leftJoinAndSelect("paymentItem.transactions", "transactions")
                .take(limit)
                .skip((page - 1) * limit);
            return await paymentItems.getMany();
            // return await paymentItemRepository.find({relations: ["transactions"]})
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

    public update = async(id: string, data: any): Promise<MissingParametersException | PaymentItem | RecordNotFoundException | Error> => {
        if(!data || ! id){
            throw new MissingParametersException()
        }

        const paymentItemRepository = getConnection().getRepository(PaymentItem);
        try {
            const itemToUpdate = await paymentItemRepository.findOne(id)
            if(itemToUpdate){
                const item = await paymentItemRepository.update(id, data)
                const updatedPaymentItem: PaymentItem = await paymentItemRepository.findOne(id, {relations: ["transactions"]})
                return updatedPaymentItem
            }else{
                throw new RecordNotFoundException()
            }
        } catch (error) {
            throw new Error()
        }
    }

    public delete = async(id: string): Promise<MissingParametersException | boolean | RecordNotFoundException | Error> => {
        if(!id){
            throw new MissingParametersException()
        }

        const paymentItemRepository = getConnection().getRepository(PaymentItem);
        try {
            const itemToDelete = await paymentItemRepository.findOne(id);
            if(itemToDelete){
                await paymentItemRepository.softDelete(id);
                return true;
            }else{
                throw new RecordNotFoundException()
            }
        } catch (error) {
            throw new Error()
        }
    }

}