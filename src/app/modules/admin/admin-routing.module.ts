import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { CustomerAddComponent } from './customer/customer-add/customer-add.component';
import { BranchListComponent } from './branch/branch-list/branch-list.component';
import { BranchAddComponent } from './branch/branch-add/branch-add.component';
import { AccountSearchComponent } from './account/account-search/account-search.component';
import { CustomerSearchComponent } from './customer/customer-search/customer-search.component';
import { AccountAddComponent } from './account/account-add/account-add.component';

const routes: Routes = [{
  path: '', component: AdminComponent,
  children: [{ path: '', component: DashboardComponent },
  { path: 'customer/list', component: CustomerListComponent },
  { path: 'customer/search', component: CustomerSearchComponent },
  { path: 'customer/:id', component: CustomerAddComponent },
  { path: 'branch/list', component: BranchListComponent },
  { path: 'branch/:id', component: BranchAddComponent },
  { path: 'account/search', component: AccountSearchComponent },
  { path: 'account/:id', component: AccountAddComponent },

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
