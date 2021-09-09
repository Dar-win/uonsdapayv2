import { getConnection, RemoveOptions, Repository } from "typeorm";
import MissingParametersException from "../../exceptions/MissingParametersException";
import RecordNotFoundException from "../../exceptions/RecordNotFoundException";
import Dao from "../../interfaces/dao.interface";
import { QuickUser } from "./quick_user.entity";

export class QuickUserDao implements Dao{
    
    public async save(data: any): Promise<MissingParametersException | QuickUser> {
        if(!data){
            throw new MissingParametersException()
        }

        const userRepository: Repository<QuickUser> = getConnection().getRepository(QuickUser);
        const newQuickUser: QuickUser = data;

        const savedData: QuickUser = await userRepository.save(newQuickUser)

        return savedData;
    }

    public async getOne(id: string): Promise<MissingParametersException | QuickUser | RecordNotFoundException | Error>{
        if(!id){
            throw new MissingParametersException()
        }

        const userRepository: Repository<QuickUser> = getConnection().getRepository(QuickUser);
        try {
            const record = await userRepository.findOne(id, {relations: ["contribution_transactions", "payment_transactions"]});
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

    public async getAll(): Promise<QuickUser[] | Error>{
        const userRepository: Repository<QuickUser> = getConnection().getRepository(QuickUser);
        try {
            const quickUsers: QuickUser[] = await userRepository.find({relations: ["contribution_transactions", "payment_transactions"]});
            return quickUsers;
        } catch (error) {
            console.log(error)
            throw new Error()
        }
    }

    public async update(id: string, data:any): Promise<MissingParametersException | RecordNotFoundException | Error | QuickUser>{
        if(!data||!id){
            throw new MissingParametersException()
        }
        const userRepository: Repository<QuickUser> = getConnection().getRepository(QuickUser);

        try {
            const userToUpdate = await userRepository.findOne(id);

            if(userToUpdate){
                await userRepository.update(id, data)
                const user: QuickUser = await userRepository.findOne(id, {relations: ["contribution_transactions", "payment_transactions"]});
                return user;
            }else{                
                throw new RecordNotFoundException()
            }
        } catch (error) {
            console.log(error)
            throw new Error()
        }
        
    }

    public async delete(id: string): Promise<MissingParametersException | RecordNotFoundException | Error | boolean>{
        if(!id){
            throw new MissingParametersException()
        }
        const userRepository: Repository<QuickUser> = getConnection().getRepository(QuickUser);

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