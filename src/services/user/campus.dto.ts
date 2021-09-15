import { Campus } from "./campus.entity";
import { Field, InputType } from "type-graphql";
import { UserDto } from "./user.dto";
import { User } from "./user.entity";

@InputType()
export class CampusDto implements Partial<Campus>{

    @Field({nullable: true})
    campus_id?: number;

    @Field({nullable:true})
    campus_name?: string;

    @Field(()=>UserDto, {nullable: true})
    users?: User[];

}