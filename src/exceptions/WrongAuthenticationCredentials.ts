import HttpException from "./HttpException";

export default class WrongAuthenticationCredentialsException extends HttpException{
    constructor(){
        super(401, "Email or password is incorrect")
    }
}