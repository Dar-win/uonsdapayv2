import { Request } from "express";
import { User } from "../services/user/user.entity";

export default interface RequestWithUser extends Request{
    user: User
}