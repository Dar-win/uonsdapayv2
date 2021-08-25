import Controller from "../../interfaces/controller.interface";
import { Request, Response, NextFunction, Router, request } from "express";
import PaymentItemDao from './payment_item.dao'

export default class PaymentItemController implements Controller{
    path: string = '/paymentItems'
    router: Router = Router();

    private paymentItemDao: PaymentItemDao = new PaymentItemDao();

    constructor(){
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.route(this.path)
            .get(this.getAll)
            .post(this.save);
        this.router.route(`${this.path}/:paymentItemId`)
            .get(this.getOne)
            .patch(this.update)
            .delete(this.delete)
    }

    private save = async(request:Request, response: Response, next:NextFunction) => {
        try {
            const savedPaymentItem = await this.paymentItemDao.save(request.body);
            response.send(savedPaymentItem);
        } catch (error) {
            console.log(error)
        }
    }

    private getOne = async(request: Request, response: Response, next: NextFunction) => {
        try {
            const paymentItem = await this.paymentItemDao.getOne(request.params.paymentItemId)
            response.send(paymentItem)
        } catch (error) {
            console.log(error)
        }
    }

    private getAll = async (request:Request, response: Response, next: NextFunction) => {
        try {
            const paymentItems = await this.paymentItemDao.getAll();
            response.send(paymentItems)
        } catch (error) {
            console.log(error)
        }
    }

    private update = async (request:Request, response: Response, next: NextFunction) => {
        try {
            const updatedItem = await this.paymentItemDao.update(request.params.paymentItemId, request.body)
            response.send(updatedItem)
        } catch (error) {
            console.log(error)
        }
    }

    private delete = async (request: Request, response:Response, next:NextFunction) => {
        try {
            const isDeleted = await this.paymentItemDao.delete(request.params.paymentItemId)
            response.send(isDeleted)
        } catch (error) {
            console.log(error)
        }
    }

}