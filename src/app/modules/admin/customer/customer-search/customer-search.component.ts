import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { Customer } from 'src/app/models/customer';
import { Router } from '@angular/router';
import * as moment from 'moment';
@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.css']
})
export class CustomerSearchComponent implements OnInit {
  id: number;
  customerModel: Customer = new Customer();
  constructor(private router: Router, private customerService: CustomerService, private _notify: NotificationService) {
  }
  ngOnInit() {
  }
  search() {
    this.customerService.getCustomerById(this.id).subscribe(data => {
      if (data) {
        this.customerModel = data;
        this.customerModel.DOB = moment(this.customerModel.DOB).format('DD-MM-YYYY');
        this.customerModel.DOJ = moment(this.customerModel.DOJ).format('DD-MM-YYYY');
      } else {
        this._notify.error('Customer not found!');
      }
    }, error => {
      this._notify.error(error.message || error.statusText);
    });
  }

  edit() {
    this.router.navigate([`/admin/customer/${this.id}`]);
  }

}
