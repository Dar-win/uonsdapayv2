import { getConnection } from "typeorm";
import MissingParametersException from "../../exceptions/MissingParametersException";
import RecordNotFoundException from "../../exceptions/RecordNotFoundException";
import Dao from "../../interfaces/dao.interface";
import { Campus } from "./campus.entity"

export default class CampusDao implements Dao {

    public save = async (data: any): Promise<MissingParametersException | Campus | Error> => {
        if(!data){
            throw new MissingParametersException()
        }
        const campusRepository = getConnection().getRepository(Campus)
        try {
            const savedCampus: Campus = await campusRepository.save(data);
            return savedCampus;
        } catch (error) {
            console.log(error)
            throw new Error()
        }
    }

    public getOne = async(id: string): Promise<MissingParametersException | RecordNotFoundException | Error | Campus> => {
        if(!id){
            throw new MissingParametersException()
        }

        const campusRepository = getConnection().getRepository(Campus);
        try {
            const campus: Campus = await campusRepository.findOne(id, {relations:['contributions', 'users']});
            if(campus){
                return campus;
            }else{
                throw new RecordNotFoundException()
            }
        } catch (error) {
            console.log(error)
            throw new Error()
        }
        
    }
    public getAll = async (): Promise<Campus[] | Error> => {
        const campusRepository = getConnection().getRepository(Campus);
        try {
            const campuses: Campus[] = await campusRepository.find({relations:['contributions', 'users']});
            return campuses;
        } catch (error) {
            console.log(error)
            throw new Error()
        }
    }
    public update = async (id: string, data: any): Promise<MissingParametersException | Campus | Error | RecordNotFoundException> => {
        if(!id || !data){
            throw new MissingParametersException()
        }

        const campusRepository = getConnection().getRepository(Campus);
        try {
            const campusToUpdate = await campusRepository.findOne(id);
            if (campusToUpdate){
                await campusRepository.update(id, data)
                const campus: Campus = await campusRepository.findOne(id, {relations:['contributions', 'users']})
                return campus
            }else{
                throw new RecordNotFoundException()
            }
        } catch (error) {
            console.log(error)
            throw new Error()
        }
        
    }
    public delete = async(id: string): Promise<MissingParametersException | Error | RecordNotFoundException | boolean> => {
        if(!id){
            throw new MissingParametersException()
        }
        
        const campusRepository = getConnection().getRepository(Campus);
        try {
            const campusToDelete = await campusRepository.findOne(id);
            if (campusToDelete){
                // const updatedCampus = campusRepository.merge(new Campus(), campusToUpdate, data)
                const deletedCampus = await campusRepository.softDelete(id)
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