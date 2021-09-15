import HttpException from "./HttpException";

export default class ErrorOccurredException extends HttpException{
    constructor(){
        super(404, "An error occurred. Please try again")
    }
}