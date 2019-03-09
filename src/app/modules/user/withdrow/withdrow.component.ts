import { Component, OnInit } from '@angular/core';
import { AccountActivityModel } from 'src/app/models/acountActivity';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from '../user.service';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-withdrow',
  templateUrl: './withdrow.component.html',
  styleUrls: ['./withdrow.component.css']
})
export class WithdrowComponent implements OnInit {

  withdrow: AccountActivityModel = new AccountActivityModel();
  constructor(private authService: AuthService, private userervice: UserService, private _notify: NotificationService) { }

  ngOnInit() {
    this.withdrow.type = 'debit';
    const account_id = this.authService.getUserInfo().account_id;
    this.withdrow.accountId = account_id;
  }

  save() {
    if (+this.userervice.accountInfo.securityPin !== +this.withdrow.securityPin) {
      this._notify.error('Invalid Security Pin!');
      return false;
    } if (this.userervice.accountInfo.amount - this.withdrow.amount < 0) {
      this._notify.error('Insufficient amount to withdrow !');
      return false;
    }
    this.withdrow.amount = +this.withdrow.amount;
    this.withdrow.securityPin = +this.withdrow.securityPin;
    this.userervice.createTransaction(this.withdrow).subscribe(data => {
      this._notify.success('amount debited successfully!');
      this.withdrow = new AccountActivityModel();
      this.userervice.getAccountById(this.withdrow.accountId).subscribe(res => {
      })
    }, error => {
      this._notify.success('could not complete this transaction please try again!');
    })
  }
}
