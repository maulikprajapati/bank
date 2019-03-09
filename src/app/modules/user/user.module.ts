import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MasterAdminGuard } from 'src/app/guards/master-admin.guard';
import { AdminGuard } from 'src/app/guards/admin.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedLayoutModule } from 'src/app/shared/shared-layout.module';
import { appUserRouting } from './user.routing';
import { UserComponent } from './user.component';
import { DepositeComponent } from './deposite/deposite.component';
import { WithdrowComponent } from './withdrow/withdrow.component';
import { TransferComponent } from './transfer/transfer.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { UserService } from './user.service';
import { AccountSummaryComponent } from './account-summary/account-summary.component';
import { AccountDetailsComponent } from './account-details/account-details.component';

@NgModule({
  imports: [
    appUserRouting,
    CommonModule,
    SharedModule,
    SharedLayoutModule
  ],
  providers: [MasterAdminGuard, AdminGuard, UserService],
  declarations: [UserComponent, DashboardComponent, DepositeComponent, WithdrowComponent, TransferComponent, TransactionsComponent, AccountSummaryComponent, AccountDetailsComponent]
})
export class UserModule { }
