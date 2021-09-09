import { getConnection } from "typeorm";
import Dao from "../../interfaces/dao.interface";
import { User } from "../user/user.entity";
import { generateEmailToken, generateUserToken, hashPassword, readToken, verifyPassword } from "../../utils/authentication.helper";
import email from '../../config/email'
import MissingParametersException from "../../exceptions/MissingParametersException";
import EmailAlreadyExistsException from "../../exceptions/EmailAlreadyExistsException";
import PhoneNumberAlreadyExistsException from "../../exceptions/PhoneNumberAlreadyExists";

export class AuthenticationDao implements Dao {

    public async register(userData: any): Promise<MissingParametersException | EmailAlreadyExistsException | PhoneNumberAlreadyExistsException | string>{
        if(!userData){
            throw new MissingParametersException();
        }
        const userRepository = getConnection().getRepository(User)
        try {
            const existingUserWithEmail = userRepository.find({where: {email_address:userData.email_address}})
            if(existingUserWithEmail){
                throw new EmailAlreadyExistsException(userData.email_address)
            }

            const existingUserWithPhoneNumber = userRepository.find({where: {phone_number:userData.phone_number}})
            if(existingUserWithPhoneNumber){
                throw new PhoneNumberAlreadyExistsException(userData.phone_number)
            }

            const hashedPassword = await hashPassword(userData.password)
            userData.password = hashedPassword;
            const newUser = userRepository.save(userData);
            userData.password = undefined;
            return this.logUserIn(userData);
        } catch (error) {
            console.log(error)
            // throw new Error(error)
        }
    }

    public async login(userData: LoginDto){
        const email: string = userData.email;
        const password: string = userData.password;

        const userRepository = getConnection().getRepository(User);
        try {
            const foundUser = await userRepository.findOne({email_address: email})
            if(!foundUser){
                //Throw wrong credentials provided 
                console.log("User does not exist")
                return;
            }
            const userPassword = foundUser.password;
            const passwordMatches = verifyPassword(password, userPassword);
            if(passwordMatches){
                return this.logUserIn(foundUser);
            }else{
                //throw wrong credentials provided 
                console.log("Wrong credentials")
            }
            
        } catch (error) {
            return error;
        }

    }

    public forgotPassword(emailAddress: string){
        const emailToken: string = generateEmailToken(emailAddress)
        const emailSubject: string = "Reset password for your uonsdapay account"
        const emailBody: string = `Click this link to reset your email password: ${process.env.API_BASE_URL}/verify/${emailToken}`

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
            console.log("Missing parameters")
        }

        const tokenData = await readToken(token)
        const emailAddress: any = tokenData.email;

        const userRepository = getConnection().getRepository(User)
        const foundUser = await userRepository.findOne({email_address: emailAddress})

        if(!foundUser){
            //throw missing user credentials
            console.log("User not found")
            return "user not found"
        }else{
            return this.logUserIn(foundUser);

        }
    }

    private logUserIn(user: User): string{
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

