import { User } from "../user/user.entity";
import { Contribution } from "./contribution.entity";
import { ID, Field, Int, InputType } from "type-graphql";
import { UserDto } from "../user/user.dto";
import { ContributionDto } from "./contribution.dto";

@InputType()
export class PledgeDto{

    @Field(()=>ID, {nullable:true})
    pledgeId: number;

    @Field(()=>Int, {nullable:true})
    amount: number;

    @Field({nullable:true})
    status: string

    @Field(()=>UserDto, {nullable:true})
    user: User;

    @Field(()=>ContributionDto, {nullable:true})
    contribution: Contribution;

}