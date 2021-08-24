import { getConnection, Repository } from "typeorm";
import Dao from "../../interfaces/dao.interface";
import { User } from "./user.entity";
import CreateUserDto from "./user.dto";

export default class UserDao implements Dao{

    public async save(data: any) {
        const userRepository: Repository<User> = getConnection().getRepository(User);
        const newUser: User = data;

        const savedData: User = await userRepository.save(newUser)

        return savedData;
    }

    public async getOne(id: string){
        const userRepository: Repository<User> = getConnection().getRepository(User);
        const record = await userRepository.findOne(id);

        if(record){
            return record;
        }else{
            console.log("Record not found")
            //throw record not found error
        }
    }

    public async getAll(){
        const userRepository: Repository<User> = getConnection().getRepository(User);
        const records = await userRepository.find();
        return records;
    }

    public async update(id: string, data:any){
        const userRepository: Repository<User> = getConnection().getRepository(User);
        const recordToUpdate = await userRepository.findOne(id);

        if(recordToUpdate){
            const savedData = userRepository.merge(new User(), recordToUpdate, data);
            const updatedRecord = await userRepository.update(id, savedData)
            return updatedRecord;
        }else{
            
            console.log("Record not found")
            return null;
            //throw record not found exception
        }

    }

    public async delete(id: string){
        const userRepository: Repository<User> = getConnection().getRepository(User);
        const recordToDelete = await userRepository.findOne(id);

        if(recordToDelete){
            const deletedRecord = userRepository.softDelete(id);
            return false;
        }

    }
}