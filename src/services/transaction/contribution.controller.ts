import Controller from "../../interfaces/controller.interface";
import { Request, Response, NextFunction, Router, request } from "express";
import ContributionDao from './contribution.dao'
import { requestQueryPagination } from "../../types";

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
            next(error)
        }
    }

    private getOne = async(request: Request, response: Response, next: NextFunction) => {
        try {
            const contribution = await this.contributionDao.getOne(request.params.contributionId)
            response.send(contribution)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    private getAll = async (request:Request, response: Response, next: NextFunction) => {
        const queryParams: requestQueryPagination = request.query;
        const filter: string = queryParams.f;
        const sort: string = queryParams.s;
        const page: number = parseInt(queryParams.page);
        const limit: number = parseInt(queryParams.limit);
        try {
            const contributions = await this.contributionDao.getAll(page, limit)
            response.send(contributions)
        } catch (error) {
            console.log(error)
            next(error)
            
        }
    }

    private update = async (request:Request, response: Response, next: NextFunction) => {
        try {
            const updatedItem = await this.contributionDao.update(request.params.contributionId, request.body)
            response.send(updatedItem)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    private delete = async (request: Request, response:Response, next:NextFunction) => {
        try {
            const isDeleted = await this.contributionDao.delete(request.params.contributionId)
            response.send(isDeleted)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

}