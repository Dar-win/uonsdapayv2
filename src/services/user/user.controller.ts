import { Request, Response, Router, NextFunction } from "express";
import Controller from "../../interfaces/controller.interface";
import UserDao from "./user.dao";
import { AuthMiddleware } from "../../middleware/authentication.middleware"
import RequestWithUser from "../../interfaces/request.user.interface";
import { requestQueryPagination } from "../../types";

export default class UserController implements Controller {
    path: string = '/users';
    router: Router = Router();
    private userDao: UserDao = new UserDao();

    constructor() {
        this.initializeRoutes();   
    }

    private initializeRoutes():void{
        this.router.route(this.path)
            .get(AuthMiddleware, this.getAll)
            .post(AuthMiddleware, this.save);
        this.router.route(`${this.path}/:userId`)
            .get(this.getOne)
            .patch(this.update)
            .delete(this.delete)
        this.router.post(`${this.path}/pledges`, AuthMiddleware, this.getUserPledges)
        this.router.post(`${this.path}/paymentTransactions`, AuthMiddleware, this.getUserTransactionPayments)
        this.router.post(`${this.path}/contributionTransactions`, AuthMiddleware, this.getUserTransactionContributions)

    }

    private save = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const newUser = request.body;
            const savedUser = await this.userDao.save(newUser);
            response.send(savedUser)
        } catch (error) {
            console.log(error)
            next(error)
        }
        
    }

    private getOne = async(request: Request, response: Response, next: NextFunction)  => {
        try {
            const user = await this.userDao.getOne(request.params.userId)
            response.send(user)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    private getAll = async(request: Request, response: Response, next: NextFunction) =>{
        try {
            const users = await this.userDao.getAll();
            response.send(users)
        } catch (error) {
            next(error)
        }
    }

    private update = async(request: Request, response: Response, next: NextFunction) => {
        try {
            const updatedUser = await this.userDao.update(request.params.userId, request.body)
            response.send(updatedUser)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    private delete = async(request: Request, response: Response, next: NextFunction) => {
        try {
            const isDeleted = await this.userDao.delete(request.params.userId)
            response.send(isDeleted)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    private getUserPledges = async (request:RequestWithUser, response: Response, next: NextFunction) => {
        const queryParams: requestQueryPagination = request.query;
        const page: number = parseInt(queryParams.page);
        const limit: number = parseInt(queryParams.limit);
        try {
            const userPledges = await this.userDao.getUserPledges(request.user.user_id, page, limit)
            response.send(userPledges)
        }catch(error){
            console.log(error);
            next(error)
        }
    }

    private getUserTransactionPayments = async (request:RequestWithUser, response: Response, next: NextFunction) => {
        const queryParams: requestQueryPagination = request.query;
        const page: number = parseInt(queryParams.page);
        const limit: number = parseInt(queryParams.limit);
        try {
            const userTransactionPayments = await this.userDao.getUserTransactionPayments(request.user.user_id, page, limit)
            response.send(userTransactionPayments)
        }catch(error){
            console.log(error);
            next(error)
        }
    }

    private getUserTransactionContributions = async (request:RequestWithUser, response: Response, next: NextFunction) => {
        const queryParams: requestQueryPagination = request.query;
        const page: number = parseInt(queryParams.page);
        const limit: number = parseInt(queryParams.limit);
        try {
            const userTransactionContributions = await this.userDao.getUserTransactionContributions(request.user.user_id, page, limit)
            response.send(userTransactionContributions)
        }catch(error){
            console.log(error);
            next(error)
        }
    }
}