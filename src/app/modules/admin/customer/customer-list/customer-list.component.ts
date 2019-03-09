import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { Customer } from 'src/app/models/customer';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customerList: Customer[] = [];
  constructor(private router: Router, private customerService: CustomerService, private _notify: NotificationService) {
    this.customerService.getAllCustomers().subscribe(data => {
      this.customerList = data;
    }, err => {
      this._notify.error(err.message);
    });
  }

  ngOnInit() { }

  editCustomer(id) {
    this.router.navigate([`/admin/customer/${id}`]);
  }
}
