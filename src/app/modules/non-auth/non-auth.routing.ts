import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    {
        path: '', component: null,
        children: [
            { path: 'login', component: LoginComponent }
        ]
    },

];

export const NonAuthRouting: ModuleWithProviders = RouterModule.forChild(routes);
