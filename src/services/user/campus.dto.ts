import { Campus } from "./campus.entity";
import { Field, InputType } from "type-graphql";

@InputType()
export class CampusDto implements Partial<Campus>{

    @Field()
    campus_name: string;
}