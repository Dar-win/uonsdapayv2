import HttpException from "./HttpException";

export default class EmailAlreadyExistsException extends HttpException{
    constructor(email: string){
        super(400, `User with email ${email} already exists`)
    }
}