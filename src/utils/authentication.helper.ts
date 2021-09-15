import bcrypt from 'bcrypt'
import { Request } from 'express'
import jwt from 'jsonwebtoken'
import { UserDto } from '../services/user/user.dto'
import { User } from '../services/user/user.entity'
import { emailTokenPayload, userTokenPayload } from '../types'

const hashPassword = async(plainTextPassword: string)=>{
    return await bcrypt.hash(plainTextPassword, 10)
}

const verifyPassword = async(plaintTextPassword: string, hashedPassword: string)=>{
    return await bcrypt.compare(plaintTextPassword, hashedPassword)
}

const generateUserToken = (user: UserDto): string => {
    const payload: userTokenPayload = {
        id: user.user_id,
        displayName: `${user.first_name} ${user.last_name}`,
        email: user.email_address,
        phoneNumber: user.phone_number
    }

    return createToken(payload, "30d");
}

const generateEmailToken = (email: string): string =>{
    const payload: emailTokenPayload = {
        email: email,
        type: "forgotPassword" 
    }

    return createToken(payload, "3h")
}

const createToken = (payload: object, expiresIn: string): string => {
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn})
}

const readToken = (token: string): any => {
    return jwt.verify(token, process.env.JWT_SECRET)
}

const getTokenFromHeader = (request: Request)=>{
    let token: string = null;
    if(request.headers.authorization){
        const bearerTokenBody = request.headers.authorization.split(" ")
        if(bearerTokenBody.length ===2){
            const bearer: string = bearerTokenBody[0]
            const foundToken: string = bearerTokenBody[1]
            if (bearer === "Bearer") {
                token = foundToken
            }
        }
    }
    return token;
}

export {
    hashPassword,
    verifyPassword,
    generateUserToken,
    generateEmailToken,
    readToken,
    getTokenFromHeader
}