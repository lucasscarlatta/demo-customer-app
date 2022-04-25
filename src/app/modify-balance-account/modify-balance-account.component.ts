import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData, NotificationService } from '../_services/notification.service';

@Component({
  selector: 'app-modify-balance-account',
  templateUrl: './modify-balance-account.component.html',
  styleUrls: ['./modify-balance-account.component.scss']
})
export class ModifyBalanceAccountComponent {
  amount: number = 0;

  constructor(
    public dialogRef: MatDialogRef<ModifyBalanceAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {currentBalance:number,addBalance:boolean},
    private notificationService:NotificationService
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(): void {
    const value = parseFloat(this.amount?.toString() ?? '0');
    if(!this.data.addBalance && (this.data.currentBalance - value) < 0){
      this.notificationService.error("Balance cannot be negative");
      return;
    }
    if( value < 0){
      this.notificationService.error("Value should be a positive number");
      return;
    }
    this.dialogRef.close(value);
  }

}
