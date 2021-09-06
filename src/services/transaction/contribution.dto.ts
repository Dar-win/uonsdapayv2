import { Contribution } from "./contribution.entity";
import { InputType, Field, Int } from "type-graphql";
import { Campus } from "../user/campus.entity";
import { ContributionTransaction } from "./transaction_contribution.entity";
import { Pledge } from "./pledge.entity";
import { CampusDto } from "../user/campus.dto";
import { ContributionTransactionDto } from "./transaction_contribution.dto";
import { PledgeDto } from "./pledge.dto";

@InputType()
export class ContributionDto implements Partial<Contribution>{
    @Field({ nullable: true })
    contribution_id: number;

    @Field(type=>[CampusDto], { nullable: true })
    campuses: Campus[]

    @Field({ nullable: true })
    contribution_name: string;

    @Field({ nullable: true })
    status: string;

    @Field(()=>Int, { nullable: true })
    goal: number;

    @Field(type=>[ContributionTransactionDto], { nullable: true })
    contribution_transactions: ContributionTransaction[];

    @Field(()=>[PledgeDto], { nullable: true })
    pledges: Pledge[];

}