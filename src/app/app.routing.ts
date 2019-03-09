import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './containers/layout/layout.component';
import { AuthGuard } from './guards/auth.guard';
import { BlankLayoutComponent } from './containers/blank-layout/blank-layout.component';
import { SkipLoginGuard } from './guards/skip-login.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: './modules/user/user.module#UserModule'
      }
    ]
  },
  {
    path: '', component: BlankLayoutComponent, canActivate: [SkipLoginGuard],
    children: [
      {
        path: '',
        loadChildren: './modules/non-auth/non-auth.module#NonAuthModule'
      }
    ]
  },
  {
    path: 'admin', component: LayoutComponent, canActivate: [AdminGuard],
    children: [
      {
        path: '',
        loadChildren: './modules/admin/admin.module#AdminModule'
      }
    ]
  },
  {
    component: NotFoundComponent,
    path: '404',
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
