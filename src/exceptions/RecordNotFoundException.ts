import HttpException from "./HttpException";

export default class RecordNotFoundException extends HttpException{
    constructor(){
        super(400, "Record not found")
    }
}