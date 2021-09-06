import { getConnection, Repository } from "typeorm";
import Dao from "../../interfaces/dao.interface";
import { QuickUser } from "./quick_user.entity";

export class QuickUserDao implements Dao{
    
    public async save(data: any) {
        if(!data){
            //throw missing params error
            console.log("Missing parameters")
            return
        }
        const userRepository: Repository<QuickUser> = getConnection().getRepository(QuickUser);
        const newQuickUser: QuickUser = data;

        const savedData: QuickUser = await userRepository.save(newQuickUser)

        return savedData;
    }

    public async getOne(id: string){
        if(!id){
            //throw missing params error
            console.log("Missing parameters")
            return
        }

        const userRepository: Repository<QuickUser> = getConnection().getRepository(QuickUser);
        
        try {
            const record = await userRepository.findOne(id, {relations: ["contribution_transactions", "payment_transactions"]});
            if(record){
                return record;
            }else{
                console.log("Record not found")
                //throw record not found error
            }
        } catch (error) {
            console.log(error)
        }
    }

    public async getAll(){
        const userRepository: Repository<QuickUser> = getConnection().getRepository(QuickUser);
        try {
            const records = await userRepository.find({relations: ["campus", "pledges"]});
            console.log(records)
            return records;
        } catch (error) {
            console.log(error)
        }
    }

    public async update(id: string, data:any){
        if(!data||!id){
            //throw missing params error
            console.log("Missing parameters")
            return
        }
        const userRepository: Repository<QuickUser> = getConnection().getRepository(QuickUser);

        try {
            const userToUpdate = await userRepository.findOne(id);

            if(userToUpdate){
                // const savedData = userRepository.merge(new QuickUser(), recordToUpdate, data);
                const updatedQuickUser = await userRepository.update(id, data)
                const user = await userRepository.findOne(id, {relations: ["contribution_transactions", "payment_transactions"]});
                console.log(user)
                return user;
            }else{
                
                console.log("Record not found")
                return null;
                //throw record not found exception
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    public async delete(id: string){
        if(!id){
            //throw missing params error
            console.log("Missing parameters")
            return
        }
        const userRepository: Repository<QuickUser> = getConnection().getRepository(QuickUser);

        try {
            const recordToDelete = await userRepository.findOne(id);

            if(recordToDelete){
                const deletedRecord = userRepository.softDelete(id);
                return true;
            }
        } catch (error) {
            console.log(error)
        }
        

    }
}