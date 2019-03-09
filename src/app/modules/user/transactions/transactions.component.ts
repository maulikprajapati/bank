import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Transaction } from 'src/app/models/transaction';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transactionList: Transaction[] = [];
  constructor(public userService: UserService, private _notify: NotificationService) { }

  ngOnInit() {
    this.userService.getTransactionsById().subscribe(data => {
      if (data && data.length) {
        this.transactionList = data;
      } else {
        this._notify.warn('No record found!');
      }
    })
  }

}
