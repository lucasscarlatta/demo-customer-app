
export class Account {
    id: string;
    name: string;
    customerId: number;
    balance: number;
    /**
     *
     */
    constructor(_id:string,_name:string,_balance:number,_customerId:number) {
        this.id=_id;
        this.name=_name;
        this.balance=_balance;
        this.customerId=_customerId;
    }
  }