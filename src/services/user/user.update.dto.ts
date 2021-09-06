import {IsAlpha, IsDefined, IsEmail} from 'class-validator'
import { Campus } from './campus.entity';
import { User } from './user.entity';
import { Field, InputType, ID } from "type-graphql";
import { CampusDto } from './campus.dto';

@InputType()
export class UpdateUserDto implements Partial<User>{

    @Field(type => ID, {nullable: true})
    user_id: number;

    @Field({nullable:true})
    first_name?: string;

    @Field({nullable:true})
    last_name?: string;

    @Field({nullable:true})
    email_address?: string;

    @Field({nullable:true})
    phone_number?: string;

    @Field({nullable:true})
    is_member?: boolean;

    @Field(()=>CampusDto, {nullable:true})
    campus?: Campus;

    @Field({nullable:true})
    local_church?: string

}