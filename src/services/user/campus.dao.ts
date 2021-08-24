import { getConnection } from "typeorm";
import Dao from "../../interfaces/dao.interface";
import { Campus } from "./campus.entity"

export default class CampusDao implements Dao {

    public save = async (data: any): Promise<any> => {
        if(!data){
            //throw missing parameters error
            console.log("missing parameter")
            return
        }
        const campusRepository = getConnection().getRepository(Campus)
        try {
            const savedCampus = await campusRepository.save(data);
            return savedCampus;
        } catch (error) {
            console.log(error)
        }
        
        
    }
    public getOne = async(id: string): Promise<any> => {
        if(!id){
            //throw missing parameters error
            console.log("missing parameter")
            return
        }

        const campusRepository = getConnection().getRepository(Campus);
        try {
            const campus = await campusRepository.findOne(id);
            if(campus){
                return campus;
            }else{
                //throw missing records
                console.log("Missing record with id: "+id)
            }
        } catch (error) {
            console.log(error)
        }
        
    }
    public getAll = async (): Promise<any> => {
        const campusRepository = getConnection().getRepository(Campus);
        try {
            const campuses = await campusRepository.find();
            return campuses;
        } catch (error) {
            console.log(error)
        }
    }
    public update = async (id: string, data: any): Promise<any> => {
        if(!id || !data){
            //throw missing parameter error
            console.log("Missing parameter")
            return
        }
        const campusRepository = getConnection().getRepository(Campus);
        try {
            const campusToUpdate = await campusRepository.findOne(id);
            if (campusToUpdate){
                const updatedCampus = campusRepository.merge(new Campus(), campusToUpdate, data)
                const upToDateCampus = campusRepository.update(id, updatedCampus)
                return upToDateCampus;
            }else{
                //throw missing record
                console.log("Missing record")
            }
        } catch (error) {
            console.log(error)
        }
        
    }
    public delete = async(id: string): Promise<any> => {
        if(!id){
            //throw missing parameter error
            console.log("Missing parameter")
            return
        }
        const campusRepository = getConnection().getRepository(Campus);
        try {
            const campusToDelete = await campusRepository.findOne(id);
            if (campusToDelete){
                // const updatedCampus = campusRepository.merge(new Campus(), campusToUpdate, data)
                const deletedCampus = await campusRepository.softDelete(id)
                return true;
            }else{
                //throw missing record
                console.log("Missing record")
                return false;
            }
        } catch (error) {
            console.log(error)
        }
    }

    
}