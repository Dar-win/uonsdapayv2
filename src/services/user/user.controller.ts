import { Request, Response, Router, NextFunction } from "express";
import Controller from "../../interfaces/controller.interface";
import UserDao from "./user.dao";

class UserController implements Controller {
    path: string = '/users';
    router: Router = Router();
    private userDao: UserDao = new UserDao();

    constructor() {
        this.initializeRoutes();   
    }

    private initializeRoutes():void{
        this.router.get(`${this.path}`, this.getOne);
        this.router.get(`${this.path}/:id`, this.getOne);
        this.router.post(`${this.path}`, this.save);
        this.router.put(`${this.path}/:id`, this.update)
        this.router.delete(`${this.path}/:id`, this.delete)

    }

    private async save(request: Request, response: Response, next: NextFunction) {
        const newUser = request.body;
        const savedUser = await this.userDao.save(newUser);
        response.send(savedUser)
        // uerDao.save(newUser)
    }

    private getOne(request: Request, response: Response, next: NextFunction) :void {

    }

    private getAll(request: Request, response: Response, next: NextFunction):void{

    }

    private update(request: Request, response: Response, next: NextFunction): void{

    }

    private delete(request: Request, response: Response, next: NextFunction): void{

    }
}