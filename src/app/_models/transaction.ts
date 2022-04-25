
export class Transaction {
    id: string;
    transactionType: string;
    type!:string;
    amount: number;
    accountId: string;
    time: Date;
    /**
     *
     */
    constructor(_id:string,_type:string,_amount:number,_date:Date,_accountId:string) {
        this.id=_id;
        this.transactionType=_type;
        this.type = _type;
        this.amount=_amount;
        this.accountId = _accountId;
        this.time=_date;
    }
  }