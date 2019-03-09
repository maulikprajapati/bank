import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DepositeComponent } from './deposite/deposite.component';
import { WithdrowComponent } from './withdrow/withdrow.component';
import { TransferComponent } from './transfer/transfer.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { AccountDetailsComponent } from './account-details/account-details.component';

const routes: Routes = [
    {
        path: '',
        component: UserComponent,
        children: [
            { path: '', component: DashboardComponent },
            { path: 'details', component: AccountDetailsComponent },
            { path: 'deposit', component: DepositeComponent },
            { path: 'withdrow', component: WithdrowComponent },
            { path: 'transfer', component: TransferComponent },
            { path: 'transactions', component: TransactionsComponent },
        ]
    },
];

export const appUserRouting: ModuleWithProviders = RouterModule.forChild(routes);
