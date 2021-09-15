
import HttpException from '../exceptions/HttpException';
import { NextFunction, Request, Response } from 'express';

const errorHandler = (error: HttpException, request: Request, response: Response, next: NextFunction)=>{
    const statusCode: number = error.statusCode;
    const statusMessage: string = error.statusMessage;

    response.status(statusCode).send(statusMessage)
}

export default errorHandler;