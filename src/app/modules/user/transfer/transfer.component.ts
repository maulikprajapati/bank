import { Component, OnInit } from '@angular/core';
import { TransferModel } from 'src/app/models/transfer';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from '../user.service';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
  transferModel: TransferModel = new TransferModel();
  constructor(private authService: AuthService, private userervice: UserService, private _notify: NotificationService) { }
  accountId: number;
  ngOnInit() {
    const account_id = this.authService.getUserInfo().account_id;
    this.transferModel.fromAccountId = +account_id;
    this.accountId = +account_id;
  }

  save() {
    this.transferModel.toAccountId = +this.transferModel.toAccountId;
    this.transferModel.amount = +this.transferModel.amount;
    this.transferModel.securityPin = +this.transferModel.securityPin;
    if (+this.userervice.accountInfo.securityPin !== +this.transferModel.securityPin) {
      this._notify.error('Invalid Security Pin!');
      return false;
    } if (this.userervice.accountInfo.amount - (+this.transferModel.amount) < 0) {
      this._notify.error('Insufficient amount to transfer !');
      return false;
    }
    this.userervice.transferMoney(this.transferModel).subscribe(data => {
      this._notify.success('amount transfered successfully!');
      this.transferModel = new TransferModel();
      this.transferModel.fromAccountId = this.accountId; 
      this.userervice.getAccountById(this.accountId).subscribe(res => { });
    },
      error => {
        this._notify.error(error.messageCode);
      })
  }
}
