import Controller from "../../interfaces/controller.interface";
import { Request, Response, NextFunction, Router, request } from "express";
import PaymentTransactionDao from "./transaction_payment.dao";
import { requestQueryPagination } from "../../types";

export default class TransactionController implements Controller{
    path: string = '/transactions'
    router: Router = Router();

    private paymentTransactionDao: PaymentTransactionDao = new PaymentTransactionDao();

    constructor(){
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.route(this.path)
            .get(this.getAll)
            .post(this.save);
        this.router.route(`${this.path}/:paymentTransactionId`)
            .get(this.getOne)
            .delete(this.delete)
    }

    private save = async(request:Request, response: Response, next:NextFunction) => {
        try {
            const savedTransaction = await this.paymentTransactionDao.save(request.body);
            response.send(savedTransaction);
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    private getOne = async(request: Request, response: Response, next: NextFunction) => {
        try {
            const paymentTransaction = await this.paymentTransactionDao.getOne(request.params.transactionId)
            response.send(paymentTransaction)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    private getAll = async (request:Request, response: Response, next: NextFunction) => {
        const queryParams: requestQueryPagination = request.query;
        const page: number = parseInt(queryParams.page);
        const limit: number = parseInt(queryParams.limit);

        try {
            const paymentTransactions = await this.paymentTransactionDao.getAll(page, limit);
            response.send(paymentTransactions)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    private delete = async (request: Request, response:Response, next:NextFunction) => {
        try {
            const isDeleted = await this.paymentTransactionDao.delete(request.params.transactionId)
            response.send(isDeleted)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

}