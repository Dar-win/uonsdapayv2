import { getConnection } from "typeorm";
import Dao from "../../interfaces/dao.interface";
import { User } from "../user/user.entity";
import { UserDto } from "../user/user.dto";
import { generateEmailToken, generateUserToken, hashPassword, readToken, verifyPassword } from "../../utils/authentication.helper";
import email from '../../config/email'
import MissingParametersException from "../../exceptions/MissingParametersException";
import EmailAlreadyExistsException from "../../exceptions/EmailAlreadyExistsException";
import PhoneNumberAlreadyExistsException from "../../exceptions/PhoneNumberAlreadyExists";
import WrongAuthenticationCredentialsException from "../../exceptions/WrongAuthenticationCredentials";
import EmailNotFoundException from "../../exceptions/EmailNotFoundException";
import UserNotFoundException from "../../exceptions/UserNotFoundException";
import ErrorOccurredException from "../../exceptions/ErrorOccurredException";
import e from "express";

export default class AuthenticationDao implements Dao {

    public async register(userData: UserDto): Promise<MissingParametersException | EmailAlreadyExistsException | PhoneNumberAlreadyExistsException | string>{
        if(!userData){
            throw new MissingParametersException();
        }
        const userRepository = getConnection().getRepository(User)
        try {
            const existingUserWithEmail = await userRepository.findOne({where: {email_address:userData.email_address}})
            if(existingUserWithEmail){
                throw new EmailAlreadyExistsException(userData.email_address)
            }

            const existingUserWithPhoneNumber = await userRepository.findOne({where: {phone_number:userData.phone_number}})
            if(existingUserWithPhoneNumber){
                throw new PhoneNumberAlreadyExistsException(userData.phone_number)
            }

            const hashedPassword = await hashPassword(userData.password)
            userData.password = hashedPassword;
            const newUser = await userRepository.save(userData);
            userData.password = undefined;
            return this.logUserIn(userData);
        } catch (error) {
            return error
            // console.log("Catching error in dao")
            // console.log(error)
            // throw new Error(error)
        }
    }

    public async login(userData: LoginDto): Promise<string | WrongAuthenticationCredentialsException>{
        const email: string = userData.email;
        const password: string = userData.password;

        const userRepository = getConnection().getRepository(User);
        try {
            const foundUser = await userRepository.findOne({email_address: email})
            if(!foundUser){
                throw new WrongAuthenticationCredentialsException()
            }
            const userPassword = foundUser.password;
            const passwordMatches = await verifyPassword(password, userPassword);
            if(passwordMatches){
                return this.logUserIn(foundUser);
            }else{
                throw new WrongAuthenticationCredentialsException();
            }
            
        } catch (error) {
            // return error
            throw new WrongAuthenticationCredentialsException();
        }

    }

    public forgotPassword(emailAddress: string){
        const emailToken: string = generateEmailToken(emailAddress)
        const emailSubject: string = "Reset password for your uonsdapay account"
        const emailBody: string = `Click this link to reset your email password: ${process.env.API_BASE_URL}/verify/${emailToken}. This link will expire in 3 hours`

        email.sendMail({
            from: "info@uonsdachurch.co.ke",
            to: emailAddress,
            subject: emailSubject,
            text: emailBody
        }).then((result)=>{
            console.log(result)
            return "Message sent"
        }).catch((error)=>{
            console.log(error)
            return "Message not sent"
        })
    }

    public async verifyEmailToken(token: string): Promise<string>{
        if(!token){
            //throw missing parameters exception
            throw new MissingParametersException()
        }

        const tokenData = await readToken(token)
        const emailAddress: any = tokenData.email;

        const userRepository = getConnection().getRepository(User)
        const foundUser: User = await userRepository.findOne({email_address: emailAddress})

        if(!foundUser){
            throw new UserNotFoundException()
        }else{
            return this.logUserIn(foundUser);
        }
    }

    public async resetPassword(id: number, newPassword: string){
        if(!id || !newPassword) throw new MissingParametersException();

        const userRepository = getConnection().getRepository(User);
        try {
            await userRepository.update(id,{password: newPassword})
            return true
        } catch (error) {
            throw new ErrorOccurredException()
        }
    }

    public async updatePassword(id: number, oldPassword: string, newPassword: string){
        if(!id || !oldPassword || !newPassword) throw new MissingParametersException()

        const userRepository = getConnection().getRepository(User)
        try {
            const foundUser = await userRepository.findOne(id)
            if(foundUser){
                const userPassword = foundUser.password;
                const passwordMatches = await verifyPassword(oldPassword, userPassword);

                if(passwordMatches){
                    await userRepository.update(id, {password: newPassword})
                    return true;
                }else{
                    throw new WrongAuthenticationCredentialsException();
                }
            }else{
                throw new UserNotFoundException();
            }
        } catch (error) {
            return error;
        }
    }

    private logUserIn(user: UserDto): string{
        const token = generateUserToken(user)
        return token;
    }



    save(data: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    getOne(id: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    update(id: string, data: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<any> {
        throw new Error("Method not implemented.");
    }

}

