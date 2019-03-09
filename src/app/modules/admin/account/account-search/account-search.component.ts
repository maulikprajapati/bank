import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/shared/notification.service';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/account';
import { AccountService } from '../account.service';
import { CustomerService } from '../../customer/customer.service';


@Component({
  selector: 'app-account-search',
  templateUrl: './account-search.component.html',
  styleUrls: ['./account-search.component.css']
})
export class AccountSearchComponent implements OnInit {
  id: number;
  accountModel: any = {};
  selectedCustomers = [];
  customers = [];
  hasAccount= false;
  constructor(private router: Router,
    private customerService: CustomerService, private accountService: AccountService, private _notify: NotificationService) {
  }
  ngOnInit() {
    this.customerService.getAllCustomers().subscribe(data => {
      this.customers = data;
    })
  }

  search() {
    this.hasAccount = false;
    this.accountModel = undefined;
    this.accountService.getAccountById(this.id).subscribe(data => {
      if (data) {
        this.hasAccount = true;
        this.selectedCustomers = this.customers.filter(x => x.account_id === data.accountId);
        this.accountModel = data;
      } else {
        this._notify.error('account not found!');
      }
    }, error => {
      this._notify.error(error.message || error.statusText);
    });
  }

  edit() {
    this.router.navigate([`/admin/account/${this.id}`]);
  }

}
