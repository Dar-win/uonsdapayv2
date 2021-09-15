import HttpException from "./HttpException";

export default class EmailNotFoundException extends HttpException{
    constructor(email_address: string){
        super(400, `User with email address ${email_address} does not exist`)
    }
}