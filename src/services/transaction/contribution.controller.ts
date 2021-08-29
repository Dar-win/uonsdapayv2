import Controller from "../../interfaces/controller.interface";
import { Request, Response, NextFunction, Router, request } from "express";
import ContributionDao from './contribution.dao'

export default class ContributionController implements Controller{
    path: string = '/contributions'
    router: Router = Router();

    private contributionDao: ContributionDao = new ContributionDao();

    constructor(){
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.route(this.path)
            .get(this.getAll)
            .post(this.save);
        this.router.route(`${this.path}/:contributionId`)
            .get(this.getOne)
            .patch(this.update)
            .delete(this.delete)
    }

    private save = async(request:Request, response: Response, next:NextFunction) => {
        try {
            const savedContribution = await this.contributionDao.save(request.body);
            response.send(savedContribution);
        } catch (error) {
            console.log(error)
        }
    }

    private getOne = async(request: Request, response: Response, next: NextFunction) => {
        try {
            const contribution = await this.contributionDao.getOne(request.params.contributionId)
            response.send(contribution)
        } catch (error) {
            console.log(error)
        }
    }

    private getAll = async (request:Request, response: Response, next: NextFunction) => {
        try {
            const contributions = await this.contributionDao.getAll();
            response.send(contributions)
        } catch (error) {
            console.log(error)
        }
    }

    private update = async (request:Request, response: Response, next: NextFunction) => {
        try {
            const updatedItem = await this.contributionDao.update(request.params.contributionId, request.body)
            response.send(updatedItem)
        } catch (error) {
            console.log(error)
        }
    }

    private delete = async (request: Request, response:Response, next:NextFunction) => {
        try {
            const isDeleted = await this.contributionDao.delete(request.params.contributionId)
            response.send(isDeleted)
        } catch (error) {
            console.log(error)
        }
    }

}