import { PaymentTransaction } from "./transaction_payment.entity";
import { ID, Field, InputType } from "type-graphql";
import { PaymentTransactionDto } from "./transaction_payment.dto";

@InputType()
export class PaymentItemDto{
    
    @Field(()=>ID, {nullable: true})
    item_id: number;

    @Field({nullable: true})
    item_name: string;

    @Field(()=>[PaymentTransactionDto], { nullable: true })
    transactions: PaymentTransaction[];
}