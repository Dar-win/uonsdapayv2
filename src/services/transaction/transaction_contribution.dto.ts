import { User } from "../user/user.entity";
import { QuickUser } from "../user/quick_user.entity";
import { Contribution } from "./contribution.entity";
import { ID, Field, Int, InputType } from "type-graphql";
import { QuickUserDto } from "../user/quick_user.dto";
import { CreateUserDto } from "../user/user.dto";
import { ContributionDto } from "./contribution.dto";

@InputType()
export class ContributionTransactionDto{
    @Field(()=>ID, {nullable: true})
    transaction_id?: number;

    @Field(()=>CreateUserDto, {nullable: true})
    user?: User;

    @Field(()=>QuickUserDto, {nullable: true})
    quickUser?: QuickUser;

    @Field(()=>ContributionDto, {nullable: true})
    contribution?: Contribution;

    @Field({nullable: true})
    receipt_number?: string;

    @Field({nullable: true})
    phone_number?: string;

    @Field(()=>Int, {nullable: true})
    amount?: number;

    @Field({nullable: true})
    transaction_date?: string;
}