export default class HttpException extends Error{
    private statusCode: number;
    private statusMessage: string;
    
    constructor(statusCode: number, statusMessage: string){
        super(statusMessage)
        this.statusCode = statusCode;
        this.statusMessage = statusMessage
    }
}