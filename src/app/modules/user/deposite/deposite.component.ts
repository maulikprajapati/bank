import { Component, OnInit } from '@angular/core';
import { AccountActivityModel } from 'src/app/models/acountActivity';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from '../user.service';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-deposite',
  templateUrl: './deposite.component.html',
  styleUrls: ['./deposite.component.css']
})
export class DepositeComponent implements OnInit {
  deposite: AccountActivityModel = new AccountActivityModel();
  constructor(private authService: AuthService, private userervice: UserService, private _notify: NotificationService) { }

  ngOnInit() {
    this.deposite.type = 'Credit';
    const account_id = this.authService.getUserInfo().account_id;
    this.deposite.accountId = account_id;
  }

  save() {
    if (+this.userervice.accountInfo.securityPin !== +this.deposite.securityPin) {
      this._notify.error('Invalid Security Pin!');
      return false;
    }
    this.deposite.amount = +this.deposite.amount;
    this.deposite.securityPin = +this.deposite.securityPin;
    this.userervice.createTransaction(this.deposite).subscribe(data => {
      this._notify.success('amount added successfully!');
      this.deposite = new AccountActivityModel();
      this.userervice.getAccountById(this.deposite.accountId).subscribe(res => {
      })
    }, error => {
      this._notify.success('could not complete this transaction please try again!');
    })
  }
}
