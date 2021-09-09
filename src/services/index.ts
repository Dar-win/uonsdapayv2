import CampusController from "./user/campus.controller";
import UserController from "./user/user.controller";
import PaymentItemController from "./transaction/payment_item.controller";
import TransactionController from "./transaction/transaction.controller";
import PledgeController from "./transaction/pledge.controller";
import ContributionController from "./transaction/contribution.controller";
import AuthenticationController from "./authentication/authentication.controller";

export default [
    CampusController,
    UserController,
    PaymentItemController,
    TransactionController,
    PledgeController,
    ContributionController,
    AuthenticationController
]