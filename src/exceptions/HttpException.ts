export default class HttpException extends Error{
    public statusCode: number;
    public statusMessage: string;
    
    constructor(statusCode: number, statusMessage: string){
        super(statusMessage)
        this.statusCode = statusCode;
        this.statusMessage = statusMessage
    }
}