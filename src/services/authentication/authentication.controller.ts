import Controller from "../../interfaces/controller.interface";
import { Router, Request, Response, NextFunction, request } from "express";
import AuthenticationDao  from "./authentication.dao";
import RequestWithUser from "../../interfaces/request.user.interface";
import { AuthMiddleware } from "../../middleware/authentication.middleware";
import ErrorOccurredException from "../../exceptions/ErrorOccurredException";

class AuthenticationController implements Controller{

    path: string = ""
    router: Router = Router();
    private authenticationDao: AuthenticationDao = new AuthenticationDao();

    constructor(){
        this.initializeRoutes();
    }

    private initializeRoutes(){
        this.router.post(`${this.path}/login`, this.login)
        this.router.post(`${this.path}/register`, this.register)
        this.router.post(`${this.path}/forgot-password`, this.forgotPassword)
        this.router.post(`${this.path}/verify/:token`, this.verifyToken)
        this.router.post(`${this.path}/reset-password`, AuthMiddleware, this.resetPassword)
        this.router.post(`${this.path}/update-password`, AuthMiddleware, this.updatePassword)
    }

    private register = async(request: Request, response: Response, next: NextFunction) =>{
        try {
            const userData = request.body;
            const result = await this.authenticationDao.register(userData)
            response.status(200).send(result);
        } catch (error) {
            next(error)
        }
    }

    private login = async(request: Request, response: Response, next: NextFunction) => {
        try{
            const loginData: LoginDto = request.body
            const token = await this.authenticationDao.login(loginData)
            response.status(200).send(token)
        }catch(error){
            next(error)
        }
    }

    private forgotPassword = async(request: Request, response: Response, next: NextFunction) =>{
        try {
            const emailAddress = request.body.email_address
            const status = await this.authenticationDao.forgotPassword(emailAddress);
            response.status(200).send(status) //either sent or not sent
        } catch (error) {
            next(error)
        }
    }

    private verifyToken = async(request: Request, response: Response, next: NextFunction) => {
        try {
            const emailToken = request.params.token
            const userToken = await this.authenticationDao.verifyEmailToken(emailToken)
            if(userToken){
                response.redirect(`${process.env.CLEINT_BASE_URL}/reset-password/${userToken}`)
            }else{
                console.log("There is no token")
            }
        } catch (error) {
            next(error)
        }
    }

    private resetPassword = async(request: RequestWithUser, response: Response, next: NextFunction) => {
        const userId: number = request.user.user_id
        const newPassword: string = request.body.newPassword
        try {
            const passwordReset = await this.authenticationDao.resetPassword(userId, newPassword);
            if (passwordReset){
                response.status(200).send("Password reset successfully")
            }else{
                throw new ErrorOccurredException()
            }
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    private updatePassword = async(request: RequestWithUser, response: Response, next: NextFunction) =>{
        const userId: number = request.user.user_id;
        const oldPassword: string = request.body.oldPassword;
        const newPassword: string = request.body.newPassword;

        try{
            const passwordUpdated = await this.authenticationDao.updatePassword(userId, oldPassword, newPassword);
            if(passwordUpdated){
                response.status(200).send("Password updated successfully");
            }else{
                throw new ErrorOccurredException()
            }
        }catch(error){
            console.log(error)
            next(error)
        }
    }
}

export default AuthenticationController