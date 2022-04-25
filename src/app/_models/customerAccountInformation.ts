import { Account } from "./account";
import { Transaction } from "./transaction";
import { User } from "./user";

export class CustomerAccountInformation {
    customer!: User;
    account!: Account;
    transactions!: Transaction[];
    
  }