import { getConnection } from "typeorm";
import Dao from "../../interfaces/dao.interface";
import { Pledge } from "./pledge.entity";

export default class PledgeDao implements Dao{
    public save = async(data: any): Promise<any> => {
        if(!data){
            //throw missing params error
            console.log("Missing parameters")
            return
        }
        const pledgeRepository = getConnection().getRepository(Pledge)
        try {
            const dataToSave: Pledge = data;
            const savedPledge = await pledgeRepository.save(dataToSave)
            return savedPledge;
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
        const pledgeRepository = getConnection().getRepository(Pledge);
        try {
            const pledge = await pledgeRepository.findOne(id, {relations: ["user", "contribution"]})
            if(pledge){
                return pledge;
            }else{
                //throw missing record error
                console.log("Missing record")
            }
        } catch (error) {
           console.log(error) 
        }
    }

    public getAll = async(): Promise<any> => {
        const pledgeRepository = getConnection().getRepository(Pledge);
        try {
            return await pledgeRepository.find({relations: ["user", "contribution"]})
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

        const pledgeRepository = getConnection().getRepository(Pledge);
        try {
            const itemToUpdate = await pledgeRepository.findOne(id)
            if(itemToUpdate){
                await pledgeRepository.update(id, data)
                const updatedPledge = await pledgeRepository.findOne(id, {relations: ["user", "contribution"]})
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

        const pledgeRepository = getConnection().getRepository(Pledge);
        try {
            const itemToDelete = await pledgeRepository.findOne(id);
            if(itemToDelete){
                await pledgeRepository.softDelete(id);
                return true;
            }else{
                return false
            }
        } catch (error) {
            console.log(error)
        }
    }

}