import HttpException from "./HttpException";

export default class MissingParametersException extends HttpException{
    constructor(){
        super(400, "Missing parameters in the request")
    }
}