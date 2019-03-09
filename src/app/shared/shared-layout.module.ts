import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { NavbarComponent } from '../containers/layout/navbar/navbar.component';
import { FooterComponent } from '../containers/layout/footer/footer.component';
import { SidebarComponent } from '../containers/layout/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [NavbarComponent, FooterComponent, SidebarComponent],
  exports: [OrderModule, NgxPaginationModule, NavbarComponent, FooterComponent, SidebarComponent, RouterModule]
})
export class SharedLayoutModule { }
