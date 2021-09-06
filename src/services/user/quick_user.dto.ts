import { PaymentTransaction } from "../transaction/transaction_payment.entity";
import { ContributionTransaction } from "../transaction/transaction_contribution.entity";
import { InputType, ID, Field } from "type-graphql";
import { PaymentTransactionDto } from "../transaction/transaction_payment.dto";
import { ContributionTransactionDto } from "../transaction/transaction_contribution.dto";

@InputType()
export class QuickUserDto{
    @Field(type=>ID, {nullable: true})
    user_id?: number;

    @Field({nullable: true})
    email_address?: string;

    @Field({nullable: true})
    phone_number?: string;

    @Field(()=>[PaymentTransactionDto], { nullable: true })
    payment_transactions?: PaymentTransaction[];

    @Field(()=>[ContributionTransactionDto], { nullable: true })
    contribution_transactions?: ContributionTransaction[];

}