import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/models/account';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification.service';
import { AccountService } from '../account.service';
import { CustomerService } from '../../customer/customer.service';
import { Customer } from 'src/app/models/customer';
import { Branch } from 'src/app/models/branch';
import { BranchService } from '../../branch/branch.service';

@Component({
  selector: 'app-account-add',
  templateUrl: './account-add.component.html',
  styleUrls: ['./account-add.component.css']
})

export class AccountAddComponent implements OnInit {
  isNew = true;
  accountId = undefined;
  accountModel: Account = new Account();
  customers: Customer[] = [];
  bankBranch: Branch[] = [];
  availableCustomers = [];
  selectedCustomers = [];
  selectedOwner = "";
  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private accountService: AccountService,
    private branchService: BranchService, private _notify: NotificationService) {
    activatedRoute.params.subscribe(x => {
      if (x['id'] !== 'add') {
        this.isNew = false;
        this.accountId = x['id'];
      }
    });
  }

  ngOnInit() {
    this.accountModel.branchId = 0;
    this.customerService.getAllCustomers().subscribe(customers => {
      this.customers = customers;
      this.availableCustomers = customers;
      this.branchService.getAllBranch().subscribe(branch => {
        this.bankBranch = branch;
      });
      if (!this.isNew) {
        this.accountService.getAccountById(this.accountId).subscribe(data => {
          this.availableCustomers = this.customers.filter(x => x.account_id !== data.accountId);
          this.selectedCustomers = this.customers.filter(x => x.account_id === data.accountId);
          if (data) {
            this.accountModel = data;
            if (!data.branchId) {
            }
          } else {
            this._notify.error('Account not found!');
          }
        }, error => {
          this._notify.error(error.message || error.statusText);
        });
      }
    }, error => {

    });

  }

  save() {
    if (!this.selectedCustomers.length) {
      this._notify.error('please add at least one owner');
      return;
    }
    if (this.accountModel.branchId) {
      this.accountModel.branchId = +this.accountModel.branchId;
    }
    if (!this.isNew) {
      this.accountModel.id = +this.accountId;
    }
    this.accountService.addUpdateAccount(this.isNew, this.accountModel).subscribe(data => {
      if (this.selectedCustomers.length) {
        this.selectedCustomers.forEach((x, index) => {
          x.account_id = this.isNew ? +data.insertId : +this.accountId;
          this.customerService.addaccount(x).subscribe(y => {
            if (index === this.selectedCustomers.length - 1) {
              this._notify.success(`Account ${this.isNew ? 'added' : 'updated'} successfully`);
              this.router.navigate(['/admin']);
            }
          });
        })
      } else {
        this._notify.success(`Account ${this.isNew ? 'added' : 'updated'} successfully`);
      }
    }, error => {
      this._notify.error(`Account could not ${this.isNew ? 'add' : 'update'} successfully`);
    });
  }

  addOwner() {
    if (this.selectedOwner) {
      const index = this.availableCustomers.findIndex(x => x.id === +this.selectedOwner);
      if (index > -1) {
        this.selectedCustomers.push(this.customers.find(x => x.id === +this.selectedOwner));
        this.availableCustomers.splice(index, 1);
        this.selectedOwner = "";
      }
    }
  }

  onCancelClick() {
    this.router.navigate(['/admin']);
  }
}
