import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from '../customer.service';
import { NotificationService } from 'src/app/shared/notification.service';
import * as moment from 'moment';
import { DatepickerOptions } from 'ng2-datepicker';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {
  isNew = true;
  customerId = undefined;
  customerModel: Customer = new Customer();
  options: DatepickerOptions = {
    displayFormat: "DD-MM-YYYY",
    addClass: 'form-control'
  }
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private customerService: CustomerService, private _notify: NotificationService) {
    activatedRoute.params.subscribe(x => {
      if (x['id'] !== 'add') {
        this.isNew = false;
        this.customerId = x['id'];
      }
    });
  }

  ngOnInit() {
    if (!this.isNew) {
      this.customerService.getCustomerById(this.customerId).subscribe(data => {
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
  }

  save() {
    this.customerModel.DOB = moment(this.customerModel.DOB).format('YYYY-DD-MM');
    this.customerModel.DOJ = moment(this.customerModel.DOJ).format('YYYY-DD-MM');
    this.customerService.addUpdateCustomer(this.isNew, this.customerModel)
      .subscribe(data => {
        this._notify.success(`customer ${this.isNew ? 'added' : 'updated'} successfully`);
        this.router.navigate(['/admin/customer/list']);
      }, error => {
        this._notify.error(`customer could not ${this.isNew ? 'add' : 'update'} successfully`);
      });
  }
  onCancelClick() {
    this.router.navigate(['/admin']);
  }
}
