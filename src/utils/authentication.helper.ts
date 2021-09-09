import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../services/user/user.entity'

const hashPassword = async(plainTextPassword: string)=>{
    return await bcrypt.hash(plainTextPassword, 10)
}

const verifyPassword = async(plaintTextPassword: string, hashedPassword: string)=>{
    return await bcrypt.compare(plaintTextPassword, hashedPassword)
}

const generateUserToken = (user: User): string => {
    const payload = {
        id: user.user_id,
        displayName: `${user.first_name} ${user.last_name}`,
        email: user.email_address,
        phoneNumber: user.phone_number
    }

    return createToken(payload, "30d");
}

const generateEmailToken = (email: string): string =>{
    const payload = {
        email: email,
        type: "forgotPassword" 
    }

    return createToken(payload, "1d")
}

const createToken = (payload: object, expiresIn: string): string => {
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn})
}

const readToken = (token: string): any => {
    return jwt.verify(token, process.env.JWT_SECRET)
}

export {
    hashPassword,
    verifyPassword,
    generateUserToken,
    generateEmailToken,
    readToken
}