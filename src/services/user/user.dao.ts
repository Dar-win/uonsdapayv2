import { getConnection, Repository } from "typeorm";
import MissingParametersException from "../../exceptions/MissingParametersException";
import RecordNotFoundException from "../../exceptions/RecordNotFoundException";
import Dao from "../../interfaces/dao.interface";
import { Pledge } from "../transaction/pledge.entity";
import { ContributionTransaction } from "../transaction/transaction_contribution.entity";
import { PaymentTransaction } from "../transaction/transaction_payment.entity";
import { User } from "./user.entity";

export default class UserDao implements Dao{

    public async save(data: any): Promise<MissingParametersException | User> {
        if(!data){
            throw new MissingParametersException()
        }

        const userRepository: Repository<User> = getConnection().getRepository(User);
        const newUser: User = data;

        try {
            const savedData: User = await userRepository.save(newUser)
            return savedData
        } catch (error) {
            console.log(error)
            throw new Error()
        }

    }

    public async getOne(id: string): Promise<MissingParametersException | RecordNotFoundException | Error | User>{
        if(!id){
            throw new MissingParametersException()
        }

        const userRepository: Repository<User> = getConnection().getRepository(User);
        
        try {
            const record: User = await userRepository.findOne(id, {relations: ["campus", "pledges", "payment_transactions", "payment_transactions.payment_item", "contribution_transactions", "contribution_transactions.contribution"]});
            if(record){
                return record;
            }else{
                throw new RecordNotFoundException()
            }
        } catch (error) {
            console.log(error)
            throw new Error()
        }
    }

    public async getAll(): Promise<User[] | Error>{
        const userRepository: Repository<User> = getConnection().getRepository(User);
        try {
            const records = await userRepository.find({relations: ["campus", "pledges", "payment_transactions", "payment_transactions.payment_item", "contribution_transactions", "contribution_transactions.contribution"]});
            return records;
        } catch (error) {
            console.log(error)
            throw new MissingParametersException()
        }
    }

    public async update(id: string, data:any): Promise<MissingParametersException | RecordNotFoundException | Error | User>{
        if(!data||!id){
            throw new MissingParametersException()
        }
        const userRepository: Repository<User> = getConnection().getRepository(User);

        try {
            const userToUpdate = await userRepository.findOne(id);

            if(userToUpdate){
                await userRepository.update(id, data)
                const user: User = await userRepository.findOne(id, {relations: ["campus", "pledges", "payment_transactions", "payment_transactions.payment_item", "contribution_transactions", "contribution_transactions.contribution"]})
                return user;
            }else{
                throw new RecordNotFoundException()
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    public async delete(id: string): Promise<MissingParametersException | boolean | RecordNotFoundException | Error>{
        if(!id){
            throw new MissingParametersException()
        }
        const userRepository: Repository<User> = getConnection().getRepository(User);

        try {
            const recordToDelete = await userRepository.findOne(id);

            if(recordToDelete){
                await userRepository.softDelete(id);
                return true;
            }else{
                throw new RecordNotFoundException()
            }
        } catch (error) {
            console.log(error)
            throw new Error()
        }
        
    }

    public getUserPledges = async(userId: number, page: number, limit: number) => {
        if(!userId || !page || !limit) throw new MissingParametersException();
        const pledgeRepository = getConnection().getRepository(Pledge);
        // console.log(userId ,"At dao")
        try{
            const pledges = pledgeRepository.createQueryBuilder("pledges");
            pledges.leftJoinAndSelect("pledges.user", "user")
                .leftJoinAndSelect("pledges.contribution", "contribution")
                .where("user.user_id = :id", {id: userId})
                .take(limit)
                .skip((page -1 )*limit)
            return pledges.getMany()
        }catch(error){
            console.log(error)
        }
    }

    public getUserTransactionPayments = async(userId: number, page: number, limit: number) => {
        if(!userId || !page || !limit) throw new MissingParametersException();
        const transactionPaymentRepository = getConnection().getRepository(PaymentTransaction);
        try{
            const paymentTransactions = transactionPaymentRepository.createQueryBuilder("paymentTransactions");
            paymentTransactions.leftJoinAndSelect("paymentTransactions.user", "user")
                .leftJoinAndSelect("paymentTransactions.payment_item", "payment_item")
                .where("user.user_id = :id", {id: userId})
                .take(limit)
                .skip((page -1 )*limit)

            return await paymentTransactions.getMany()
        }catch(error){
            console.log(error)
        }
    }
    public getUserTransactionContributions = async(userId: number, page: number, limit: number) => {
        if(!userId || !page || !limit) throw new MissingParametersException();
        const transactionContributionRepository = getConnection().getRepository(ContributionTransaction);
        try{
            const contributionTransactions = transactionContributionRepository.createQueryBuilder("contributionTransactions");
            contributionTransactions.leftJoinAndSelect("contributionTransactions.user", "user")
                .leftJoinAndSelect("contributionTransactions.contribution", "contribution")
                .where("user.user_id = :id", {id: userId})
                .take(limit)
                .skip((page -1 )*limit)
            
                return await contributionTransactions.getMany()
        }catch(error){
            console.log(error)
        }
    }
}