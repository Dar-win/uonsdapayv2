import { getConnection } from "typeorm";
import MissingParametersException from "../../exceptions/MissingParametersException";
import RecordNotFoundException from "../../exceptions/RecordNotFoundException";
import Dao from "../../interfaces/dao.interface";
import { Pledge } from "./pledge.entity";

export default class PledgeDao implements Dao{

    public save = async(data: any): Promise<MissingParametersException | Pledge | Error> => {
        if(!data){
            throw new MissingParametersException()
        }

        const pledgeRepository = getConnection().getRepository(Pledge)
        try {
            const dataToSave: Pledge = data;
            const savedPledge: Pledge = await pledgeRepository.save(dataToSave)
            return savedPledge;
        } catch (error) {
            throw new Error()
        }
    }

    public getOne = async(id: string): Promise<MissingParametersException | Pledge | RecordNotFoundException | Error> => {
        if(!id){
            throw new MissingParametersException()
        }
        const pledgeRepository = getConnection().getRepository(Pledge);
        
        try {
            const pledge: Pledge = await pledgeRepository.findOne(id, {relations: ["user", "contribution"]})
            if(pledge){
                return pledge;
            }else{
                throw new RecordNotFoundException()
            }
        } catch (error) {
            throw new Error() 
        }
    }

    public getAll = async(page: number, limit: number): Promise<Pledge[] | Error> => {
        if(!page || !limit) throw new MissingParametersException()
        const pledgeRepository = getConnection().getRepository(Pledge);
        try {
            return await pledgeRepository.find({
                relations: ["user", "contribution"], 
                skip: (page -1) * limit,
                take: limit
            })
        } catch (error) {
            console.log(error)
            throw new Error(error)  
        }
    }

    public update = async(id: string, data: any): Promise<MissingParametersException | Pledge | RecordNotFoundException | Error> => {
        if(!data || ! id){
            throw new MissingParametersException()
        }

        const pledgeRepository = getConnection().getRepository(Pledge);
        try {
            const itemToUpdate = await pledgeRepository.findOne(id)
            if(itemToUpdate){
                await pledgeRepository.update(id, data)
                const updatedPledge: Pledge = await pledgeRepository.findOne(id, {relations: ["user", "contribution"]})
                return updatedPledge
            }else{
                throw new RecordNotFoundException()
            }
        } catch (error) {
            console.log(error)
            throw new Error()
        }
    }
    public delete = async(id: string): Promise<MissingParametersException | RecordNotFoundException | boolean | Error> => {
        if(!id){
            throw new MissingParametersException()
        }

        const pledgeRepository = getConnection().getRepository(Pledge);
        try {
            const itemToDelete = await pledgeRepository.findOne(id);
            if(itemToDelete){
                await pledgeRepository.softDelete(id);
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