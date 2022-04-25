import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ModifyBalanceAccountComponent } from '../modify-balance-account/modify-balance-account.component';
import { NewAccountComponent } from '../new-account/new-account.component';
import { Account } from '../_models/account';
import { CustomerAccountInformation } from '../_models/customerAccountInformation';
import { Transaction } from '../_models/transaction';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { CustomerAccountInformationService } from '../_services/customer-account-information.service';
import { LoadingService } from '../_services/loading.service';
import { NotificationService } from '../_services/notification.service';
import { TransactionService } from '../_services/transaction.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit,AfterViewInit {
  displayedColumns: string[] = ['type', 'amount', 'date'];
  dataSource = new MatTableDataSource<Transaction>([]);
  selectedAccountId:string = "-1";
  accounts: Account[] = [];
  customerId:string = "";
  currentUser!: User;

  constructor(
    private loadingService:LoadingService
    ,private notificationService:NotificationService
    ,private dialog: MatDialog
    ,private router: Router
    ,private route: ActivatedRoute
    ,private accountService: AccountService
    ,private transactionService: TransactionService
    ,private customerAccountInformationService: CustomerAccountInformationService
    ,private cdRef: ChangeDetectorRef
    ) { }

  ngAfterViewInit() {
  }
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.customerId =  params['customerId'];
      this.loadAccounts();
    });
    
    this.currentUser = (<User[]>JSON.parse(localStorage.getItem("users") ?? '[]'))
                      .filter(u => u.customerId == this.customerId)[0];
  }

  loadAccounts(){
    this.loadingService.show();
    this.accountService.getAll(this.customerId).subscribe(accounts =>{
      this.accounts = accounts ?? [];
      this.loadingService.hide();
    })
  }

  backToUsers(){
    this.router.navigate(["/"]);
  }

  viewTransactions(accountId: string){
    this.loadingService.show();
    this.customerAccountInformationService.getAll(accountId).subscribe(customerAccountInformation=>{
      this.selectedAccountId=accountId;
      this.dataSource.data = customerAccountInformation?.transactions ?? [] ;
      this.loadingService.hide();
    })
  }


  hideTransactions(accountId: string){
    this.selectedAccountId = "-1";
  }

  newAccount(){
    const dialogRef = this.dialog.open(NewAccountComponent, {
      width: '300px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(account => {
      if(!account) return;
      console.log('The dialog was closed');
      account.customerId = this.customerId;
      this.loadingService.show();
      this.accountService.post(account).subscribe(accountCreated=>{
        this.accounts.push(accountCreated);
        this.notificationService.success("Account created successfuly");
        this.loadingService.hide();
      })
    });
  }


  addAmount(account: Account){
    const dialogRef = this.dialog.open(ModifyBalanceAccountComponent, {
      width: '300px',
      data: {addBalance:true, currentBalance: account.balance},
    });

    dialogRef.afterClosed().subscribe(valueToAdd => {
      if(!valueToAdd) return;
      this.loadingService.show();
      const transaction = new Transaction('','DEPOSIT',valueToAdd,new Date(),account.id);
      this.transactionService.post(transaction).subscribe(_=>{
        if(this.selectedAccountId === account.id){
          this.dataSource.data.push(transaction);
          const transactions = this.dataSource.data;
          this.dataSource.data = transactions;
          
        }
        this.loadingService.hide();
        account.balance += valueToAdd;
        this.notificationService.success("Balance modified successfuly");
      })
    });
  }

  reduceAmount(account:Account){
    const dialogRef = this.dialog.open(ModifyBalanceAccountComponent, {
      width: '300px',
      data: {addBalance:false, currentBalance: account.balance},
    });

    dialogRef.afterClosed().subscribe(valueToReduce => {
      if(!valueToReduce) return;
      this.loadingService.show();
      const transaction = new Transaction('','WITHDRAW',valueToReduce,new Date(),account.id);
      this.transactionService.post(transaction).subscribe(_=>{
        if(this.selectedAccountId === account.id){
          this.dataSource.data.push(transaction);
          const transactions = this.dataSource.data;
          this.dataSource.data = transactions;
        }
        this.loadingService.hide();
        account.balance -= valueToReduce;
        this.notificationService.success("Balance modified successfuly");
      })
    });
  }
}
