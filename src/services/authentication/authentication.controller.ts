import Controller from "../../interfaces/controller.interface";
import { Router, Request, Response, NextFunction } from "express";
import { AuthenticationDao } from "./authentication.dao";


export default class AuthenticationController implements Controller{

    public path = "/auth"
    public router: Router = Router();

    private authenticationDao = new AuthenticationDao();

    constructor(){
        this.initalizeRoutes();
    }

    private initalizeRoutes(){
        this.router.post(`${this.path}/login`, this.login)
        this.router.post(`${this.path}/register`, this.register)
        this.router.post(`${this.path}/forgot-password`, this.forgotPassword)
        this.router.post(`${this.path}/verify/:token`, this.verifyToken)
    }

    private async register(request: Request, response: Response, next: NextFunction){
        try {
            const userData = request.body;
            const token = await this.authenticationDao.register(userData)
            response.send(token);
        } catch (error) {
            next(error)
        }
    }

    private async login(request: Request, response: Response, next: NextFunction){
        try{
            const loginData: LoginDto = request.body
            const token = await this.authenticationDao.login(loginData)
            response.send(token)
        }catch(error){
            next(error)
        }
    }

    private async forgotPassword(request: Request, response: Response, next: NextFunction){
        try {
            const emailAddress = request.body
            const status = await this.authenticationDao.forgotPassword(emailAddress);
            response.send(status) //either sent or not sent
        } catch (error) {
            next(error)
        }
    }

    private async verifyToken(request: Request, response: Response, next: NextFunction){
        try {
            const emailToken = request.params.token
            const userToken = await this.authenticationDao.verifyEmailToken(emailToken)
            if(userToken){
                response.redirect(`${process.env.CLEINT_BASE_URL}/reset-password/?${userToken}`)
            }else{
                console.log("There is no token")
            }
        } catch (error) {
            
        }
    }
}