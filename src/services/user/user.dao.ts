import { getConnection, Repository } from "typeorm";
import MissingParametersException from "../../exceptions/MissingParametersException";
import RecordNotFoundException from "../../exceptions/RecordNotFoundException";
import Dao from "../../interfaces/dao.interface";
import { User } from "./user.entity";

export default class UserDao implements Dao{

    public async save(data: any): Promise<MissingParametersException | User> {
        if(!data){
            throw new MissingParametersException()
        }

        const userRepository: Repository<User> = getConnection().getRepository(User);
        const newUser: User = data;

        const savedData: User = await userRepository.save(newUser)

        return savedData;
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
}