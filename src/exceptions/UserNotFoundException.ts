import HttpException from "./HttpException"

export default class UserNotFoundException extends HttpException{
    constructor(){
        super(400, "User not found")
    }
}