import Controller from "../../interfaces/controller.interface";
import { Request, Response, NextFunction, Router, request } from "express";
import PledgeDao from './pledge.dao'

export default class PledgeController implements Controller{
    path: string = '/pledges'
    router: Router = Router();

    private pledgeDao: PledgeDao = new PledgeDao();

    constructor(){
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.route(this.path)
            .get(this.getAll)
            .post(this.save);
        this.router.route(`${this.path}/:pledgeId`)
            .get(this.getOne)
            .patch(this.update)
            .delete(this.delete)
    }

    private save = async(request:Request, response: Response, next:NextFunction) => {
        try {
            const savedPledge = await this.pledgeDao.save(request.body);
            response.send(savedPledge);
        } catch (error) {
            console.log(error)
        }
    }

    private getOne = async(request: Request, response: Response, next: NextFunction) => {
        try {
            const pledge = await this.pledgeDao.getOne(request.params.pledgeId)
            response.send(pledge)
        } catch (error) {
            console.log(error)
        }
    }

    private getAll = async (request:Request, response: Response, next: NextFunction) => {
        try {
            const pledges = await this.pledgeDao.getAll();
            response.send(pledges)
        } catch (error) {
            console.log(error)
        }
    }

    private update = async (request:Request, response: Response, next: NextFunction) => {
        try {
            const updatedItem = await this.pledgeDao.update(request.params.pledgeId, request.body)
            response.send(updatedItem)
        } catch (error) {
            console.log(error)
        }
    }

    private delete = async (request: Request, response:Response, next:NextFunction) => {
        try {
            const isDeleted = await this.pledgeDao.delete(request.params.pledgeId)
            response.send(isDeleted)
        } catch (error) {
            console.log(error)
        }
    }

}