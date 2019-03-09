import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedLayoutModule } from 'src/app/shared/shared-layout.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { CustomerAddComponent } from './customer/customer-add/customer-add.component';
import { BranchListComponent } from './branch/branch-list/branch-list.component';
import { BranchAddComponent } from './branch/branch-add/branch-add.component';
import { AccountSearchComponent } from './account/account-search/account-search.component';
import { CustomerSearchComponent } from './customer/customer-search/customer-search.component';
import { AccountAddComponent } from './account/account-add/account-add.component';
import { CustomerService } from './customer/customer.service';
import { AccountService } from './account/account.service';
import { BranchService } from './branch/branch.service';
import { NgDatepickerModule } from 'ng2-datepicker';

@NgModule({
  imports: [CommonModule, AdminRoutingModule, SharedModule, SharedLayoutModule, NgDatepickerModule],
  declarations: [
    AdminComponent,
    DashboardComponent,
    CustomerListComponent,
    CustomerAddComponent,
    BranchListComponent,
    BranchAddComponent,
    AccountSearchComponent,
    CustomerSearchComponent,
    AccountAddComponent
  ],
  providers: [CustomerService, AccountService, BranchService]
})
export class AdminModule { }
