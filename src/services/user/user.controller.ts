import { Request, Response, Router, NextFunction } from "express";
import Controller from "../../interfaces/controller.interface";
import UserDao from "./user.dao";

export default class UserController implements Controller {
    path: string = '/users';
    router: Router = Router();
    private userDao: UserDao = new UserDao();

    constructor() {
        this.initializeRoutes();   
    }

    private initializeRoutes():void{
        this.router.route(this.path)
            .get(this.getAll)
            .post(this.save);
        this.router.route(`${this.path}/:userId`)
            .get(this.getOne)
            .patch(this.update)
            .delete(this.delete)

    }

    private save = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const newUser = request.body;
            const savedUser = await this.userDao.save(newUser);
            response.send(savedUser)
        } catch (error) {
            console.log(error)
        }
        
    }

    private getOne = async(request: Request, response: Response, next: NextFunction)  => {
        try {
            const user = await this.userDao.getOne(request.params.userId)
            response.send(user)
        } catch (error) {
            console.log(error)
        }
    }

    private getAll = async(request: Request, response: Response, next: NextFunction) =>{
        try {
            const users = await this.userDao.getAll();
            response.send(users)
        } catch (error) {
            console.log(error)
        }
    }

    private update = async(request: Request, response: Response, next: NextFunction) => {
        try {
            const updatedUser = await this.userDao.update(request.params.userId, request.body)
            response.send(updatedUser)
        } catch (error) {
            console.log(error)
        }
    }

    private delete = async(request: Request, response: Response, next: NextFunction) => {
        try {
            const isDeleted = await this.userDao.delete(request.params.userId)
            response.send(isDeleted)
        } catch (error) {
            console.log(error)
        }
    }
}