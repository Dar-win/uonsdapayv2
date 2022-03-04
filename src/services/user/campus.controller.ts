import Controller from "../../interfaces/controller.interface";
import { Router, Request, Response, NextFunction } from "express";
import CampusDao from "./campus.dao";

class CampusController implements Controller {

    path: string = "/campuses"
    router: Router = Router()
    private campusDao: CampusDao = new CampusDao();

    constructor(){
        this.initializeRoutes()
    }

    private initializeRoutes(){
        this.router.route(this.path)
            .get(this.getAll)
            .post(this.save)
        this.router.route(`${this.path}/:campusId`)
            .get( this.getOne)
            .patch(this.update)
            .delete(this.delete)

    }

    private save = async(request: Request, response: Response, next: NextFunction) => {
        try{
            const savedCampus = await this.campusDao.save(request.body)
            response.send(savedCampus);
        }catch(error){
            console.log(error)
            next(error)
        }
        
    }

    private getOne = async(request: Request, response: Response, next: NextFunction) => {
        try{
            const campus = await this.campusDao.getOne(request.params.campusId)
            response.send(campus);
        }catch(error){
            console.log(error)
            next(error)
        }
        
    }

    private getAll = async(request: Request, response: Response, next: NextFunction) => {
        try{
            const campuses = await this.campusDao.getAll()
            response.send(campuses);
        }catch(error){
            console.log(error)
            next(error)
        }
        
    }

    private update = async(request: Request, response: Response, next: NextFunction) => {
        try{
            const updatedCampus = await this.campusDao.update(request.params.campusId, request.body)
            response.send(updatedCampus);
        }catch(error){
            console.log(error)
            next(error)
        }
        
    }

    private delete = async(request: Request, response: Response, next: NextFunction) => {
        try{
            const status = await this.campusDao.delete(request.params.campusId)
            response.send(status);
        }catch(error){
            console.log(error)
            next(error)
        }
        
    }
}

export default CampusController;