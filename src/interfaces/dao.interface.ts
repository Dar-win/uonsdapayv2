import { User } from "../services/user/user.entity";

export default interface Dao{
    save(data: any): Promise<any>;
    getOne(id: string): Promise<any>;
    getAll(page: number, limit: number, filter?: string, sort?: string, ):Promise<any>;
    update(id: string, data:any): Promise<any>;
    delete(id: string): Promise<any>;
}