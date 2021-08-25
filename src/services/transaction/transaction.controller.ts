import Controller from "../../interfaces/controller.interface";
import { Request, Response, NextFunction, Router, request } from "express";
import TransactionDao from "./transaction.dao";

export default class TransactionController implements Controller{
    path: string = '/transactions'
    router: Router = Router();

    private transactionDao: TransactionDao = new TransactionDao();

    constructor(){
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.route(this.path)
            .get(this.getAll)
            .post(this.save);
        this.router.route(`${this.path}/:transactionId`)
            .get(this.getOne)
            .delete(this.delete)
    }

    private save = async(request:Request, response: Response, next:NextFunction) => {
        try {
            const savedTransaction = await this.transactionDao.save(request.body);
            response.send(savedTransaction);
        } catch (error) {
            console.log(error)
        }
    }

    private getOne = async(request: Request, response: Response, next: NextFunction) => {
        try {
            const transaction = await this.transactionDao.getOne(request.params.transactionId)
            response.send(transaction)
        } catch (error) {
            console.log(error)
        }
    }

    private getAll = async (request:Request, response: Response, next: NextFunction) => {
        try {
            const transactions = await this.transactionDao.getAll();
            response.send(transactions)
        } catch (error) {
            console.log(error)
        }
    }

    private delete = async (request: Request, response:Response, next:NextFunction) => {
        try {
            const isDeleted = await this.transactionDao.delete(request.params.transactionId)
            response.send(isDeleted)
        } catch (error) {
            console.log(error)
        }
    }

}