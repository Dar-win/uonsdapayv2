import {IsAlpha, IsDefined, IsEmail} from 'class-validator'
import { Campus } from './campus.entity';
import { User } from './user.entity';

export default class CreateUserDto implements Partial<User>{


    first_name?: string;

    last_name?: string;

    email_address?: string;

    phone_number?: string;

    is_member?: boolean;

    campus?: Campus

    local_church?: string

}