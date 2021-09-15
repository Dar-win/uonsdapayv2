import { Response, NextFunction } from "express";
import { getConnection } from "typeorm";
import MissingAuthenticationTokenException from "../exceptions/MissingAuthenticationTokenException";
import WrongAuthenticationToken from "../exceptions/WrongAuthenticationToken";
import RequestWithUser from "../interfaces/request.user.interface";
import { User } from "../services/user/user.entity";
import { userTokenPayload } from "../types";
import { getTokenFromHeader, readToken } from "../utils/authentication.helper";

export const AuthMiddleware = async (request: RequestWithUser, response: Response, next: NextFunction)=>{
    const token = getTokenFromHeader(request)
    if(token){
        try{

            const tokenData: userTokenPayload = await readToken(token);

            const user_id: number = tokenData.id;
            const userRepository = getConnection().getRepository(User)
        
            const user = await userRepository.findOne(user_id);
            if(user){
                request.user = user;
                next()
            }else{
                next(new WrongAuthenticationToken())
            }
        } catch (error) {
            next(new WrongAuthenticationToken())
        }
    }else{
        next(new MissingAuthenticationTokenException())
    }
    
}