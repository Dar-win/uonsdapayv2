import { getConnection, Repository } from "typeorm";
import Dao from "../../interfaces/dao.interface";
import { User } from "./user.entity";
import CreateUserDto from "./user.dto";

export default class UserDao implements Dao{

    public async save(data: any) {
        if(!data){
            //throw missing params error
            console.log("Missing parameters")
            return
        }

        const userRepository: Repository<User> = getConnection().getRepository(User);
        const newUser: User = data;

        const savedData: User = await userRepository.save(newUser)

        return savedData;
    }

    public async getOne(id: string){
        if(!id){
            //throw missing params error
            console.log("Missing parameters")
            return
        }

        const userRepository: Repository<User> = getConnection().getRepository(User);
        
        try {
            const record = await userRepository.findOne(id, {relations: ["campus", "pledges"]});
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
        const userRepository: Repository<User> = getConnection().getRepository(User);
        try {
            const records = await userRepository.find({relations: ["campus", "pledges"]});
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
        const userRepository: Repository<User> = getConnection().getRepository(User);

        try {
            const userToUpdate = await userRepository.findOne(id);

            if(userToUpdate){
                // const savedData = userRepository.merge(new User(), recordToUpdate, data);
                const updatedUser = await userRepository.update(id, data)
                return updatedUser;
            }else{
                
                console.log("Record not found")
                return null;
                //throw record not found exception
            }
        } catch (error) {
            
        }
        

    }

    public async delete(id: string){
        if(!id){
            //throw missing params error
            console.log("Missing parameters")
            return
        }
        const userRepository: Repository<User> = getConnection().getRepository(User);

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