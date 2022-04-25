import {Component, Inject, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Account } from '../_models/account';
import { DialogData, NotificationService } from '../_services/notification.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss']
})
export class NewAccountComponent {
  test!:string;
  newAccount: Account = new Account("0","",0,0);

  constructor(
    public dialogRef: MatDialogRef<NewAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private notificationService:NotificationService
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(): void {
    if(!this.newAccount.name) {
      this.notificationService.error("Name cannot be empty");
      return;
    }
    
    if( this.newAccount.balance < 0) {
      this.notificationService.error("Balance is required and should be higher than 0");
      return;
    }

    if(!this.newAccount.balance){
      this.newAccount.balance = 0;
    }
    this.dialogRef.close(this.newAccount);
  }

}
