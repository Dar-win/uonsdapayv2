import { PaymentItem } from "./payment_item.entity";
import { User } from "../user/user.entity";
import { QuickUser } from "../user/quick_user.entity";
import { InputType, ID, Field, Int } from "type-graphql";
import { UserDto } from "../user/user.dto";
import { QuickUserDto } from "../user/quick_user.dto";
import { PaymentItemDto } from "./payment_item.dto";

@InputType()
export class PaymentTransactionDto{
    @Field(()=>ID, {nullable: true})
    transaction_id?: number;

    @Field(()=>UserDto, {nullable: true})
    user?: User;

    @Field(()=>QuickUserDto, {nullable: true})
    quickUser?: QuickUser;

    @Field({nullable: true})
    is_campus_payment?: boolean;

    @Field(()=>PaymentItemDto, {nullable: true})
    payment_item?: PaymentItem;

    @Field({nullable: true})
    receipt_number?: string;

    @Field({nullable: true})
    phone_number?: string;

    @Field(()=>Int, {nullable: true})
    amount?: number;

    @Field({nullable: true})
    transaction_date?: string;

}