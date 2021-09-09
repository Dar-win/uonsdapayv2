import HttpException from "./HttpException";

export default class PhoneNumberAlreadyExistsException extends HttpException{
    constructor(phoneNumber: string){
        super(400, `User with phone number ${phoneNumber} already exists`)
    }
}